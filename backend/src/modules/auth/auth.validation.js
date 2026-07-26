import Joi from "joi";

const phoneRegex = /^[6-9]\d{9}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

export const signupSchema = Joi.object({
  fullName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  email: Joi.string()
    .email()
    .allow("", null),

  phone: Joi.string()
    .pattern(phoneRegex)
    .required(),

  password: Joi.string()
    .pattern(passwordRegex)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain uppercase, lowercase, number and special character.",
    }),

  role: Joi.string()
    .valid(
      "customer",
      "shop_owner",
      "delivery_partner"
    )
    .default("customer"),
});

export const loginSchema = Joi.object({
  phone: Joi.string()
    .pattern(phoneRegex)
    .required(),

  password: Joi.string().required(),
});

export const otpSchema = Joi.object({
  phone: Joi.string()
    .pattern(phoneRegex)
    .required(),

  otp: Joi.string()
    .length(6)
    .required(),
});

export const forgotPasswordSchema = Joi.object({
  phone: Joi.string()
    .pattern(phoneRegex)
    .required(),
});

export const resetPasswordSchema = Joi.object({
  phone: Joi.string()
    .pattern(phoneRegex)
    .required(),

  otp: Joi.string()
    .length(6)
    .required(),

  newPassword: Joi.string()
    .pattern(passwordRegex)
    .required(),
});
