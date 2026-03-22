import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
     const { internId, raised } = await req.json();

     if (!internId) {
        return NextResponse.json({ error: "Intern ID required" }, { status: 400 });
     }

     const user = await prisma.user.update({
        where: {
           id: internId,
        },
        data: {
           handRaised: raised,
        },
     });

     return NextResponse.json({ success: true, handRaised: user.handRaised });
  } catch (error) {
     return NextResponse.json({ error: "Failed to update hand raised status" }, { status: 500 });
  }
}
