import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userName, teamName, teamMembers, eventReview, juryFeedback, hackathonJourney } = body;

        if (!(prisma as any).review) {
            console.error("[API] Critical: Review model not found in Prisma Client.");
            return NextResponse.json({
                success: false,
                error: "System sync required. Please restart the dev server."
            }, { status: 500 });
        }

        const review = await (prisma as any).review.create({
            data: {
                userName,
                teamName,
                teamMembers,
                eventReview,
                juryFeedback,
                hackathonJourney,
            },
        });

        return NextResponse.json({ success: true, data: review });
    } catch (error: any) {
        console.error("[API] POST Error:", error.message);
        return NextResponse.json({ success: false, error: error.message, stack: error.stack }, { status: 500 });
    }
}

export async function GET() {
    try {
        const reviews = await (prisma as any).review.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ success: true, reviews });
    } catch (error: any) {
        console.error("[API] GET Error:", error.message);
        return NextResponse.json({
            success: false,
            error: error.message,
            isPrismaError: error.name?.includes("Prisma")
        }, { status: 500 });
    }
}
