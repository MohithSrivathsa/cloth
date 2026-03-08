import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().int().positive(),
  color: z.string().min(2),
  stockQuantity: z.number().int().nonnegative(),
  images: z.array(z.string().url()).min(1)
});

export const cartItemSchema = z.object({
  productId: z.string().cuid(),
  name: z.string(),
  price: z.number().int().positive(),
  quantity: z.number().int().positive(),
  image: z.string().url(),
  size: z.enum(["S", "M", "L", "XL"]),
  color: z.string()
});

export const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1)
});
