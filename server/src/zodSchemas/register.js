import { z } from "zod";
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be at least of 6 charcaters"),
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
export { registerSchema };
