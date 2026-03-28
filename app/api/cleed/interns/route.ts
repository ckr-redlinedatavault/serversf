import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const interns = await prisma.user.findMany({
      where: {
        role: "INTERN",
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(interns);
  } catch (error) {
    console.error("Error fetching interns:", error);
    return NextResponse.json({ error: "Failed to fetch interns" }, { status: 500 });
  }
}
