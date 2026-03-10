import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { host, port, user, pass, secure } = await req.json();

        const transporter = nodemailer.createTransport({
            host,
            port: parseInt(port),
            secure,
            auth: {
                user,
                pass,
            },
        });

        await transporter.verify();

        return NextResponse.json({ success: true, message: "SMTP Connection Successful" });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message || "Connection Failed" },
            { status: 500 }
        );
    }
}
