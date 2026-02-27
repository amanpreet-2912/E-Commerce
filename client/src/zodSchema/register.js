import { z } from "zod";
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 character long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must atleast be of 6 characters" }),

  role: z.string().optional(),
  gstin: z
    .string()

    // .length(15, { message: "GSTIN must be 15 characters long" })
    // .regex(
    //   /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    //   "Invalid GSTIN format",
    // )
    .optional(),
  vehicleNum: z.string().optional(),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export const otpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, { message: "Otp must be of 6 digits" }),
});
export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});
export const resetSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});
