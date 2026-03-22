import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const result = await prisma.user.updateMany({
      where: {
        handRaised: true,
      },
      data: {
        handRaised: false,
      },
    });

    return NextResponse.json({ success: true, count: result.count });
  } catch (error) {
    console.error("Error lowering all signals:", error);
    return NextResponse.json({ error: "Failed to reset signal protocols" }, { status: 500 });
  }
}
