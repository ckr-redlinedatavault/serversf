import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "No user ID provided" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isApproved: true },
    });

    return NextResponse.json({ message: `User ${updatedUser.name} approved.` });
  } catch (error) {
    console.error("Approval error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
