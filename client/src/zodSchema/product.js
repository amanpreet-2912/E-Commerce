import { z } from "zod";
export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number().positive("price must be greater than 0"),
  stock: z.coerce.number().positive("Stock must be greater than 0"),
  images: z.any().optional(),
  categoryId: z.string(),
  subcategoryId: z.string(),
});
