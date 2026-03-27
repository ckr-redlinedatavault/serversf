import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Deadline Check: 7:00 PM IST on March 27, 2026
        const DEADLINE = new Date("2026-03-27T19:00:00+05:30").getTime();
        if (Date.now() > DEADLINE) {
            return NextResponse.json({ 
                success: false, 
                error: "Registration closed. The deadline was March 27, 2026 at 7:00 PM IST." 
            }, { status: 403 });
        }

        const { 
            name, 
            year, 
            branch, 
            interestedArea, 
            email, 
            phone, 
            portfolioLink, 
            recentProjectLink 
        } = body;

        // Simple Validation
        if (!name || !year || !branch || !interestedArea || !email || !phone) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const submission = await prisma.kitsInternForm.create({
            data: {
                name,
                year,
                branch,
                interestedArea,
                email,
                phone,
                portfolioLink,
                recentProjectLink,
            },
        });

        return NextResponse.json({ success: true, data: submission });
    } catch (error) {
        console.error("KITS Submission error:", error);
        return NextResponse.json({ success: false, error: "Failed to submit form" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const submissions = await prisma.kitsInternForm.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ success: true, data: submissions });
    } catch (error) {
        console.error("Fetch error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch submissions" }, { status: 500 });
    }
}
