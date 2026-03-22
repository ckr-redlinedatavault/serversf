import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const cleedEmail = process.env.CLEED_EMAIL;
    const cleedPassword = process.env.CLEED_PASSWORD;

    if (email === cleedEmail && password === cleedPassword) {
       // In a production app, set HTTP-only cookie here
       // For this project, we'll just return success
       return NextResponse.json({ success: true, user: { email, role: "CLEED" } });
    }

    return NextResponse.json({ error: "Invalid administrative credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
