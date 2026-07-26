import Joi from "joi";

export const createCatalogSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(""),
});

export const updateCatalogSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string().allow(""),
});
