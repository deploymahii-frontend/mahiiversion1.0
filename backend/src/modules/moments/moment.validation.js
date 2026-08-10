import Joi from "joi";

export const createMomentSchema = Joi.object({
  title: Joi.string().max(150).allow("", null),
  caption: Joi.string().max(2200).allow("", null),
  description: Joi.string().max(2200).allow("", null),
  mediaUrl: Joi.string().required(),
  mediaType: Joi.string().valid("image", "video").default("image"),
  thumbnailUrl: Joi.string().allow("", null),
  shop: Joi.string().hex().length(24).allow("", null),
  shopId: Joi.string().hex().length(24).allow("", null),
  productId: Joi.string().hex().length(24).allow("", null),
  productIds: Joi.array().items(Joi.string().hex().length(24)).max(5),
  offerId: Joi.string().hex().length(24).allow("", null),
  location: Joi.string().max(200).allow("", null),
  hashtags: Joi.array().items(Joi.string()).max(10),
  type: Joi.string().allow("", null),
  status: Joi.string().valid("DRAFT", "PUBLISHED").default("PUBLISHED"),
});

export const commentSchema = Joi.object({
  text: Joi.string().min(1).max(1000).required(),
  value: Joi.string().min(1).max(1000).allow("", null),
  parentCommentId: Joi.string().hex().length(24).allow("", null),
});

export const reportMomentSchema = Joi.object({
  reason: Joi.string()
    .valid(
      "SPAM",
      "FAKE_CONTENT",
      "OFFENSIVE",
      "HARASSMENT",
      "ILLEGAL_CONTENT",
      "MISLEADING",
      "WRONG_PRODUCT",
      "OTHER"
    )
    .required(),
  details: Joi.string().max(1000).allow("", null),
});

export const storySchema = Joi.object({
  mediaUrl: Joi.string().required(),
  mediaType: Joi.string().valid("image", "video").default("image"),
  caption: Joi.string().max(500).allow("", null),
  productId: Joi.string().hex().length(24).allow("", null),
  shopId: Joi.string().hex().length(24).allow("", null),
});
