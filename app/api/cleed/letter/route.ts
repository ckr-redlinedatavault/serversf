import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { internId, letterUrl } = await req.json();

    if (!internId || !letterUrl) {
      return NextResponse.json({ error: "Intern ID and Letter URL are required" }, { status: 400 });
    }

    console.log("Protocol Initiation: Internship Letter Issuance for intern:", internId);
    const user = await prisma.user.update({
      where: { id: internId },
      data: { letterUrl },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error sending letter:", error);
    return NextResponse.json({ error: "Failed to send internship letter" }, { status: 500 });
  }
}
