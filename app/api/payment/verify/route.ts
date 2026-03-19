import crypto from "crypto";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
      formData
    } = body;

    if (!process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Missing RAZORPAY_KEY_SECRET. Security check aborted.");
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      // ✅ PAYMENT VERIFIED - SAVE TO DB
      const enrollment = await prisma.courseEnrollment.create({
        data: {
          courseId,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          college: formData.college,
          branch: formData.branch,
          year: formData.year,
          whyJoin: formData.whyJoin,
          
          paymentMethod: "RAZORPAY",
          amount: formData.amount.toString(),
          
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          
          status: "captured"
        }
      });

      return NextResponse.json({ success: true, enrollment });
    } else {
      console.warn("Razorpay Signature Mismatch");
      return NextResponse.json(
        { success: false, error: "Signature verification failed" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Razorpay Verification Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
