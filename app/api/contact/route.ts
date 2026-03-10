import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        if (!(prisma as any).contact) {
            console.error("[API] Critical: Contact model not found in Prisma Client. This usually means you need to restart 'npm run dev' to refresh the cache.");
            return NextResponse.json({
                success: false,
                error: "System sync required. Please restart the dev server (Ctrl+C and npm run dev)."
            }, { status: 500 });
        }

        const contact = await (prisma as any).contact.create({
            data: {
                name,
                email,
                subject: subject || "No Subject",
                message,
            },
        });

        return NextResponse.json({ success: true, data: contact });
    } catch (error: any) {
        console.error("[API] Contact POST Error:", error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const contacts = await (prisma as any).contact.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ success: true, contacts });
    } catch (error: any) {
        console.error("[API] Contact GET Error:", error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
