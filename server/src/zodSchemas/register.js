import { z } from "zod";
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be at least of 6 charcaters"),
  role: z.string().optional(),
  gstin:z.string().optional(),
  vehicleNum:z.string().optional()
});
export { registerSchema };
