import { start } from "workflow/api";
import { handleUserSignup } from "@/workflows"; // assuming @/workflows maps to workflows/index.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Executes asynchronously and doesn't block your app
    await start(handleUserSignup, [email]);

    return NextResponse.json({
      message: "User signup workflow started",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
