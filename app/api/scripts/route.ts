import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { title, content, submittedBy } = await req.json();

        const script = await prisma.script.create({
            data: {
                title,
                content,
                submittedBy: submittedBy || "Anonymous Media Agent"
            }
        });

        return NextResponse.json({ success: true, script });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to submit script" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const scripts = await prisma.script.findMany({
            orderBy: { createdAt: 'desc' },
            take: 20
        });
        return NextResponse.json({ success: true, scripts });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch scripts" }, { status: 500 });
    }
}
