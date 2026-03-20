import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, year, branch, college, phoneNumber, githubLink, portfolioLink } = body;

        // Validation
        if (!name || !year || !branch || !college || !phoneNumber || !githubLink) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const submission = await prisma.internForm.create({
            data: {
                name,
                year,
                branch,
                college,
                phoneNumber,
                githubLink,
                portfolioLink,
            },
        });

        return NextResponse.json({ success: true, data: submission });
    } catch (error) {
        console.error("Submission error:", error);
        return NextResponse.json({ success: false, error: "Failed to submit form" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const submissions = await prisma.internForm.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ success: true, data: submissions });
    } catch (error) {
        console.error("Fetch error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch submissions" }, { status: 500 });
    }
}
