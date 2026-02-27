import { Router } from "express";
import authRouter from "./auth.js";
import adminRouter from "./adminRoutes.js";
import sellerRouter from "./seller.js";
import userRouter from "./userRoutes.js";
import transporterRouter from "./transporterRoutes.js";
const router = Router();
router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/seller", sellerRouter);
router.use("/user", userRouter);
router.use("/transporter", transporterRouter);

export default router;
