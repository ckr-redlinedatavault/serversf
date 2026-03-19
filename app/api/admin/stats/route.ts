import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        // Counting real records from the database using updated Prisma Client
        const [studentCount, eventCount, reviewCount, contactCount] = await Promise.all([
            prisma.student.count(),
            prisma.event.count(),
            prisma.review.count(),
            prisma.contact.count()
        ]);

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
        console.error("[API] Admin Core Stats Error:", error.message);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch dashboard intelligence. " + error.message
        }, { status: 500 });
    }
}
