import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { internId } = await req.json();

    if (!internId) {
      return NextResponse.json({ error: "Intern identity required" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: internId },
      data: { isApproved: true },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Authorization Error:", error);
    return NextResponse.json({ error: "Internal protocol failure during authorization" }, { status: 500 });
  }
}
