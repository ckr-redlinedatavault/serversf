import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const course = await prisma.course.findUnique({
            where: { id: id }
        });
        if (!course) return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 });
        return NextResponse.json({ success: true, course });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
