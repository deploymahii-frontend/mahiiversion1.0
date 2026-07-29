import Joi from "joi";

const phoneRegex = /^[0-9]{10}$/;

export const signupSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100),
  name: Joi.string().trim().min(2).max(100),

  email: Joi.string().email({ tlds: { allow: false } }).allow("", null),

  phone: Joi.string().pattern(phoneRegex).required().messages({
    "string.pattern.base": "Phone number must be a valid 10-digit mobile number.",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
  }),

  role: Joi.string().valid("customer", "shop_owner", "delivery_partner", "admin", "SHOPOWNER", "CUSTOMER").default("customer"),
}).or("fullName", "name").unknown(true);

export const loginSchema = Joi.object({
  phone: Joi.string().pattern(phoneRegex),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().required(),
}).or("phone", "email").unknown(true);

export const otpSchema = Joi.object({
  phone: Joi.string().pattern(phoneRegex).required(),
  otp: Joi.string().length(6).required(),
}).unknown(true);

export const forgotPasswordSchema = Joi.object({
  phone: Joi.string().pattern(phoneRegex),
  email: Joi.string().email({ tlds: { allow: false } }),
}).unknown(true);

export const resetPasswordSchema = Joi.object({
  phone: Joi.string().pattern(phoneRegex),
  email: Joi.string().email({ tlds: { allow: false } }),
  otp: Joi.string().length(6).required(),
  newPassword: Joi.string().min(6).required(),
}).unknown(true);
