import Joi from "joi";

export const createReviewSchema = Joi.object({
  shop: Joi.string().required(),
  order: Joi.string().optional().allow(null, ""),
  rating: Joi.number().min(1).max(5).required(),
  review: Joi.string().max(1000).optional().allow(""),
  images: Joi.array().items(Joi.string()).optional().default([]),
  isVerifiedPurchase: Joi.boolean().optional(),
});
