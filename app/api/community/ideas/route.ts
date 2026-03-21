import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ideas = await prisma.idea.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(ideas);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch ideas" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, subline, title, description } = body;

    const idea = await prisma.idea.create({
      data: {
        name,
        subline,
        title,
        description,
      },
    });

    return NextResponse.json(idea);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create idea" }, { status: 500 });
  }
}
