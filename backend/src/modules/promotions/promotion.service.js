import * as repository from "./promotion.repository.js";
import Shop from "../shops/shop.model.js";

export async function createPromotion(userId, data) {
  const shop = await Shop.findById(data.shop);

  if (!shop) {
    throw new Error("Shop not found.");
  }

  const promotion = await repository.createPromotion({
    shop: data.shop,
    createdBy: userId,
    type: data.type,
    title: data.title,
    description: data.description || "",
    budget: data.budget || 0,
    startDate: data.startDate || new Date(),
    endDate: data.endDate || null,
    status: data.status || "PENDING",
  });

  return promotion;
}

export const getShopPromotions = (shopId) => repository.findActiveByShop(shopId);

export async function getNearbyPromotions(shopIds) {
  return repository.findNearbyActive(shopIds);
}

export const trackPromotionView = async (promotionId) => {
  const promotion = await repository.incrementViews(promotionId);

  if (!promotion) {
    throw new Error("Promotion not found.");
  }

  return promotion;
};

export const trackPromotionClick = async (promotionId) => {
  const promotion = await repository.incrementClicks(promotionId);

  if (!promotion) {
    throw new Error("Promotion not found.");
  }

  return promotion;
};
