import { Router } from "express";
import authRouter from "./auth.js";
import adminRouter from "./adminRoutes.js";
import sellerRouter from "./seller.js"
import userRouter from "./userRoutes.js"
const router = Router();
router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/seller",sellerRouter);
router.use("/user",userRouter)
export default router;
