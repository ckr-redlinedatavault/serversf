import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const internId = searchParams.get("internId");
    
    if (!internId) {
      return NextResponse.json({ error: "Identity token required" }, { status: 400 });
    }

    const attendances = await prisma.attendance.findMany({
      where: {
        userId: internId,
      },
      orderBy: {
        date: "desc",
      },
      take: 30, // Last 30 sessions
    });

    return NextResponse.json(attendances);
  } catch (error) {
    console.error("Attendance Retrieval error:", error);
    return NextResponse.json({ error: "Failed to fetch attendance logs" }, { status: 500 });
  }
}
