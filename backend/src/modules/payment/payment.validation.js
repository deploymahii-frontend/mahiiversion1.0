import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
    receipt: z.string().min(1),
  }),
});

export const verifySchema = z.object({
  body: z.object({
    orderId: z.string().min(1),
    razorpay_order_id: z.string().min(1),
    razorpay_payment_id: z.string().min(1),
    razorpay_signature: z.string().min(1),
  }),
});
