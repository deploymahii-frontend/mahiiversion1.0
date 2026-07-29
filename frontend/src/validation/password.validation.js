import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z.string().email("Enter a valid email address"),
});

export const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, "Password must contain at least 8 characters")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[!@#$%^&*]/, "Must contain a special character"),

    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
});

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
        .string()
        .min(8, "Password must contain at least 8 characters")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[!@#$%^&*]/, "Must contain a special character"),
    confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
});
