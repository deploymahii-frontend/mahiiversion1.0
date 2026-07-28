import { z } from "zod";

export const loginSchema = z.object({
    phone: z
        .string()
        .min(10, "Phone number is required"),

    password: z
        .string()
        .min(6, "Password must contain at least 6 characters"),

    remember: z.boolean().optional(),
});
