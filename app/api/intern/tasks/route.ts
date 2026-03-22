import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
     const { searchParams } = new URL(req.url);
     const internId = searchParams.get("internId");

     if (!internId) {
        return NextResponse.json({ error: "Intern ID required" }, { status: 400 });
     }

     const tasks = await prisma.task.findMany({
        where: {
           assignedToId: internId,
        },
        orderBy: {
           createdAt: "desc",
        },
     });

     return NextResponse.json(tasks);
  } catch (error) {
     return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}
