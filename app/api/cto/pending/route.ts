import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const pendingUsers = await prisma.user.findMany({
      where: {
        role: "MEDIA_TEAM",
        isApproved: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ users: pendingUsers });
  } catch (error) {
    console.error("Pending users query error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
