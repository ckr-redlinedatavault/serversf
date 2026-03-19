import { razorpay } from "@/lib/razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, courseId, name } = await req.json();

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100), // INR → paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        courseId,
        studentName: name
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
