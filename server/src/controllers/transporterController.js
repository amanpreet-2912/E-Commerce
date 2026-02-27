import { Order } from "../models/orderSchema.js";
export async function getOrders(req, res) {
  try {
    const transporterId = req.user.id;
    const orders = await Order.find({ transporter: transporterId })
      .populate("user", "name email").populate("orderItems.product")
      .sort({ createdAt: -1 });
    console.log(orders);
    res.json({ orders: orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching orders" });
  }
}
export async function updateStatus(req, res) {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.transporter.toString() !== req.user.id) {
      return res.status(403).json({ message: "not allowed" });
    }
    order.status = status;
    await order.save();
    res.json({ message: "Status updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating status" });
  }
}
