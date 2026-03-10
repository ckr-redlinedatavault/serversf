import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { config, students, template } = await req.json();

        const transporter = nodemailer.createTransport({
            host: config.host,
            port: parseInt(config.port),
            secure: config.secure,
            auth: {
                user: config.user,
                pass: config.pass,
            },
        });

        const results = {
            success: 0,
            failed: 0,
            errors: [] as string[],
        };

        for (const student of students) {
            try {
                const finalHtml = template.html.replace(/{name}/g, student.name).replace(/{email}/g, student.email);
                const finalSubject = template.subject.replace(/{name}/g, student.name);

                await transporter.sendMail({
                    from: `"${config.fromName || "Student Forge"}" <${config.user}>`,
                    to: student.email,
                    subject: finalSubject,
                    html: finalHtml,
                });
                results.success++;
            } catch (err: any) {
                console.error(`Failed to send to ${student.email}:`, err);
                results.failed++;
                results.errors.push(`${student.email}: ${err.message}`);
            }
        }

        return NextResponse.json({
            success: results.success > 0,
            results,
            message: results.failed > 0 ? `Completed with ${results.failed} errors.` : "All emails sent successfully!"
        });
    } catch (error: any) {
        console.error("Mailer API Error:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
