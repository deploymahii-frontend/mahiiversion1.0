import Joi from "joi";

export const addToCartSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).default(1),
});

export const updateCartQuantitySchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
});

export const applyCouponSchema = Joi.object({
  couponCode: Joi.string().trim().uppercase().min(3).required(),
});
