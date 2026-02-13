import { Router } from "express";
import {
  registerUser,
  verifyOtp,
  loginUser,
  getUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { registerSchema } from "../zodSchemas/register.js";
import { validate } from "../middlewares/schemaValidator.js";
import { checkToken } from "../middlewares/checkToken.js";
const router = Router();
router.post("/register", validate(registerSchema), registerUser);
router.post("/verify", verifyOtp);
router.post("/login", loginUser);
router.get("/user", getUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
export default router;
