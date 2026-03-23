import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const internId = searchParams.get('internId');

        const schedules = await prisma.schedule.findMany({
            include: {
                submissions: internId ? {
                    where: { internId }
                } : true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        const mappedSchedules = schedules.map((s: any) => ({
            ...s,
            isCompleted: s.submissions && s.submissions.length > 0,
            githubLink: s.submissions?.[0]?.githubLink || null,
            submissionLink: s.submissions?.[0]?.submissionLink || null
        }));

        return NextResponse.json({ success: true, schedules: mappedSchedules });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { 
            week, 
            typeOfWork, 
            toolsUsed, 
            deploymentTools, 
            requirements, 
            description, 
            outcomes, 
            deadline 
        } = body;

        const schedule = await prisma.schedule.create({
            data: {
                week,
                typeOfWork,
                toolsUsed, // Array
                deploymentTools: deploymentTools || [], // New field
                requirements: requirements || [], // New field
                description,
                outcomes, // Array
                deadline: new Date(deadline)
            }
        });

        return NextResponse.json({ success: true, schedule });
    } catch (error: any) {
        console.error("Schedule Creation Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
