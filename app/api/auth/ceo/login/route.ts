import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Check against fixed environment variables first
        const envUser = process.env.CEO_USER;
        const envPass = process.env.CEO_PASS;

        if (email === envUser && password === envPass) {
            return NextResponse.json({
                id: "fixed_ceo_identity",
                name: "Operational CEO",
                email: envUser,
                role: "CEO"
            });
        }

        const user = await prisma.user.findFirst({
            where: {
                email,
                password,
                role: "CEO"
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Access denied. CEO credentials required." }, { status: 401 });
        }

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
