import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const submissions = await prisma.scheduleSubmission.findMany({
            include: {
                schedule: true,
                intern: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json({ success: true, submissions });
    } catch (error: any) {
        console.error("Fetch submissions error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
