import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, branch, year, email, phone } = body;

        if (!name || !branch || !year || !email || !phone) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const submission = await prisma.javaWorkshop.create({
            data: {
                name,
                branch,
                year,
                email,
                phone,
            },
        });

        return NextResponse.json({ success: true, data: submission });
    } catch (error) {
        console.error("Java Workshop Submission error:", error);
        return NextResponse.json({ success: false, error: "Failed to submit form" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const submissions = await prisma.javaWorkshop.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ success: true, data: submissions });
    } catch (error) {
        console.error("Fetch error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch submissions" }, { status: 500 });
    }
}
