import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        // Deadline Check: March 20, 2026, 7:00 PM IST
        const deadline = new Date("2026-03-20T19:00:00+05:30");
        const now = new Date();

        if (now > deadline) {
            return NextResponse.json({ 
                success: false, 
                error: "The application period for internships has ended as of March 20, 2026, 7:00 PM IST." 
            }, { status: 403 });
        }

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
