import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const [ctoCount, mediaCount, studentCount, reviewCount, contactCount] = await Promise.all([
            prisma.user.count({ where: { role: 'CTO' } }),
            prisma.user.count({ where: { role: 'MEDIA_TEAM' } }),
            prisma.student.count(),
            prisma.review.count(),
            prisma.contact.count(),
        ]);

        return NextResponse.json({
            success: true,
            data: {
                ctos: ctoCount,
                media: mediaCount,
                students: studentCount,
                reviews: reviewCount,
                messages: contactCount
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch CEO overview" }, { status: 500 });
    }
}
