import Joi from "joi";

export const createBusinessSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(""),
});

export const updateBusinessSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string().allow(""),
});
