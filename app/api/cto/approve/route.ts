import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendApprovalEmail } from "@/lib/mail";

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

    // Send the professional email notification
    let mailSent = false;
    if (updatedUser.email) {
      mailSent = await sendApprovalEmail(updatedUser.email, updatedUser.name);
    }

    return NextResponse.json({ 
      success: true,
      message: `User ${updatedUser.name} approved.`,
      notification: mailSent ? "Email sent successfully" : "Email failed to send"
    });
  } catch (error: any) {
    console.error("Approval error:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
  }
}
