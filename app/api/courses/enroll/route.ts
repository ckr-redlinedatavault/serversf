import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            courseId,
            name,
            phone,
            email,
            college,
            branch,
            year,
            whyJoin,
            referenceId,
            transactionId,
            bankName,
            accountName,
            amount
        } = body;

        // Create enrollment record
        const enrollment = await prisma.courseEnrollment.create({
            data: {
                courseId,
                name,
                phone,
                email,
                college,
                branch,
                year,
                whyJoin,
                referenceId,
                transactionId,
                bankName,
                accountName,
                amount,
                status: "pending"
            }
        });

        return NextResponse.json({ success: true, enrollment });
    } catch (error: any) {
        console.error("Enrollment Error:", error);
        if (error.code === 'P2002') {
            return NextResponse.json({ success: false, error: "This Reference ID has already been used." }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const enrollments = await prisma.courseEnrollment.findMany({
            include: { course: true },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ success: true, enrollments });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
