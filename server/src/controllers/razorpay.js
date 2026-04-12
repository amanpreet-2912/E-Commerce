import { razor } from "../config/razorpay.js";
async function handlePayment(req, res) {
  try {
    const { amount } = req.body;
    const order = await razor.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt" + Date.now(),
    });
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error in payment" });
  }
}
export { handlePayment };
