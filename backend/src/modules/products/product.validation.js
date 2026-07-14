import Joi from "joi";
import { PRODUCT_STATUS, PRODUCT_TYPE } from "./product.constants.js";

export const createProductSchema = Joi.object({
  shop: Joi.string().required(),

  name: Joi.string().trim().min(2).max(200).required(),

  description: Joi.string().trim().allow("").default(""),

  type: Joi.string()
    .valid(...Object.values(PRODUCT_TYPE))
    .required(),

  price: Joi.number().min(0).required(),

  discountPrice: Joi.number().min(0).default(0),

  images: Joi.array().items(Joi.string().uri().allow("")).default([]),

  status: Joi.string()
    .valid(...Object.values(PRODUCT_STATUS))
    .default(PRODUCT_STATUS.ACTIVE),

  stock: Joi.number().integer().min(0).default(0),

  isFeatured: Joi.boolean().default(false),
});

export const updateProductSchema = Joi.object({
  shop: Joi.string(),

  name: Joi.string().trim().min(2).max(200),

  description: Joi.string().trim().allow(""),

  type: Joi.string().valid(...Object.values(PRODUCT_TYPE)),

  price: Joi.number().min(0),

  discountPrice: Joi.number().min(0),

  images: Joi.array().items(Joi.string().uri().allow("")),

  status: Joi.string().valid(...Object.values(PRODUCT_STATUS)),

  stock: Joi.number().integer().min(0),

  isFeatured: Joi.boolean(),
}).min(1);
