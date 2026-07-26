import { z } from "zod";

export const addItemSchema = z.object({
  body: z.object({
    shop: z.string().min(1),
    product: z.string().min(1),
    name: z.string().min(1),
    image: z.string().optional(),
    price: z.number().nonnegative(),
    quantity: z.number().min(1),
  }),
});

export const updateQuantitySchema = z.object({
  body: z.object({
    quantity: z.number().min(1),
  }),
});
