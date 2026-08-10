import Joi from "joi";

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const createReviewSchema = Joi.object({
  shopId: Joi.string().pattern(objectIdPattern).optional(),
  shop: Joi.string().pattern(objectIdPattern).optional(),
  orderId: Joi.string().pattern(objectIdPattern).optional(),
  order: Joi.string().pattern(objectIdPattern).optional(),
  rating: Joi.number().integer().min(1).max(5).required(),
  title: Joi.string().trim().min(3).max(100).allow("").optional(),
  comment: Joi.string().trim().min(5).max(2000).allow("").optional(),
  review: Joi.string().trim().min(5).max(2000).allow("").optional(),
  images: Joi.array().items(Joi.string().uri({ allowRelative: true })).optional().default([]),
})
  .or("shopId", "shop")
  .or("orderId", "order");

export const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).optional(),
  title: Joi.string().trim().min(3).max(100).allow("").optional(),
  comment: Joi.string().trim().min(5).max(2000).allow("").optional(),
  review: Joi.string().trim().min(5).max(2000).allow("").optional(),
  images: Joi.array().items(Joi.string().uri({ allowRelative: true })).optional(),
});

export const ownerReplySchema = Joi.object({
  comment: Joi.string().trim().min(3).max(1000).required(),
});

export const reportReviewSchema = Joi.object({
  reason: Joi.string()
    .valid(
      "SPAM",
      "FAKE_REVIEW",
      "OFFENSIVE",
      "HARASSMENT",
      "WRONG_SHOP",
      "PROMOTIONAL",
      "OTHER"
    )
    .required(),
  details: Joi.string().trim().max(500).allow("").optional(),
});
