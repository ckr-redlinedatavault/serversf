import Razorpay from "razorpay";

// We check if keys are present. If not, we provide a placeholder to prevent build errors.
// The actual error will catch at runtime if someone tries to use it without Env Vars.
const KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "razor_secret_placeholder";

export const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});
