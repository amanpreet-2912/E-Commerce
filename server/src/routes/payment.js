import { Router } from "express";
import { handlePayment } from "../controllers/razorpay.js";
const router = Router();
router.post("/test", handlePayment);

export default router;
