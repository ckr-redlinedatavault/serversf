import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { userId } = await req.json();
        if (!userId) return NextResponse.json({ success: false }, { status: 400 });

        await prisma.user.update({
            where: { id: userId },
            data: { lastActive: new Date() }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
