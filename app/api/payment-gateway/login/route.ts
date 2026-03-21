import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const adminUser = process.env.PAYMENT_GATEWAY_USER;
    const adminPass = process.env.PAYMENT_GATEWAY_PASS;

    if (email === adminUser && password === adminPass) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
