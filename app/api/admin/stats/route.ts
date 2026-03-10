import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        if (!(prisma as any).student) {
            return NextResponse.json({ success: false, error: "System sync required. Please restart server." }, { status: 500 });
        }

        // Count real records from the database
        const studentCount = await (prisma as any).student.count();
        const eventCount = await (prisma as any).event.count();
        const reviewCount = await (prisma as any).review.count();
        const contactCount = await (prisma as any).contact.count();

        return NextResponse.json({
            success: true,
            stats: {
                students: studentCount,
                events: eventCount,
                reviews: reviewCount,
                contacts: contactCount,
            }
        });
    } catch (error: any) {
        console.error("[API] Stats GET Error:", error.message);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch stats"
        }, { status: 500 });
    }
}
