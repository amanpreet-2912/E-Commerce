import razorpay from "razorpay";

export const razor = new razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
