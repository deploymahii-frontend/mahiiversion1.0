import Promotion from "./promotion.model.js";

export const createPromotion = (data) => Promotion.create(data);

export const findPromotionById = (id) => Promotion.findById(id);

export const findActiveByShop = (shopId) =>
  Promotion.find({ shop: shopId, status: "ACTIVE" }).sort({ createdAt: -1 });

export const findNearbyActive = (shopIds) =>
  Promotion.find({ shop: { $in: shopIds }, status: "ACTIVE" }).sort({ createdAt: -1 });

export const incrementViews = (id) =>
  Promotion.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });

export const incrementClicks = (id) =>
  Promotion.findByIdAndUpdate(id, { $inc: { clicks: 1 } }, { new: true });
