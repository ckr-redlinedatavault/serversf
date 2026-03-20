import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { title, description, assignedTo } = await req.json();

        const task = await prisma.task.create({
            data: {
                title,
                description,
                assignedTo: assignedTo || "MEDIA_TEAM"
            }
        });

        return NextResponse.json({ success: true, task });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to create task" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: { createdAt: 'desc' },
            take: 20
        });
        return NextResponse.json({ success: true, tasks });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch tasks" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { id, status } = await req.json();
        const task = await prisma.task.update({
            where: { id },
            data: { status }
        });
        return NextResponse.json({ success: true, task });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update task" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });

        await prisma.task.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to delete task" }, { status: 500 });
    }
}
