import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const enrollment = await prisma.courseEnrollment.findUnique({
            where: { id },
            include: { course: true }
        });
        if (!enrollment) return NextResponse.json({ success: false, error: "Enrollment not found" }, { status: 404 });
        return NextResponse.json({ success: true, enrollment });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { status } = await req.json();
        const enrollment = await prisma.courseEnrollment.update({
            where: { id },
            data: { status }
        });
        return NextResponse.json({ success: true, enrollment });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.courseEnrollment.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
