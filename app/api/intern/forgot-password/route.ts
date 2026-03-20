import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/mail";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Check if user exists (Optional: for security, don't confirm if user exists)
        // But for intern portal, it's better to know if the email is correct.
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Standard practice: Return success even if user not found to prevent user enumeration
            // But we'll provide a message for better UX in this internal portal
            return NextResponse.json({ error: "No account found with this email." }, { status: 404 });
        }

        // Generate token
        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 3600000); // 1 hour

        // Clear existing tokens for this email
        await prisma.resetToken.deleteMany({
            where: { email },
        });

        // Store token
        await prisma.resetToken.create({
            data: {
                token,
                email,
                expires,
            },
        });

        // Send email
        const mailSent = await sendPasswordResetEmail(email, token);

        if (!mailSent) {
            return NextResponse.json({ error: "Failed to send reset email. Contact admin." }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Reset link sent if account exists." });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
