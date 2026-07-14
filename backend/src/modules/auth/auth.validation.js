import Joi from "joi";

export const signupSchema = Joi.object({
  fullName: Joi.string().min(2).max(100).required(),

  email: Joi.string().email().required(),

  mobile: Joi.string().min(10).max(15).required(),

  password: Joi.string()
    .min(8)
    .max(100)
    .required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().required(),
});
