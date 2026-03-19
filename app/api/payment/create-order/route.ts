import { razorpay } from "@/lib/razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, courseId, name } = await req.json();
    console.log("Creating Razorpay Order for amount:", amount, "Course:", courseId);
    
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay API Keys are missing in Environment Variables");
    }

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100), // INR → paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        courseId,
        studentName: name
      },
    });

    console.log("Order created successfully:", order.id);

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
