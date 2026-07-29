import * as repository from "./moment.repository.js";
import Shop from "../shops/shop.model.js";
import { MOMENT_STATUS, MOMENT_TYPE } from "./moment.constants.js";

export async function createMoment(userId, data) {
  if (!data.title && !data.description) {
    throw new Error("Title or caption is required for a moment.");
  }

  if (!data.mediaUrl && !data.videoUrl) {
    throw new Error("Media URL is required for a moment.");
  }

  let shopId = null;
  if (data.shop) {
    const shop = await Shop.findById(data.shop);
    if (!shop) throw new Error("Shop not found.");
    shopId = shop._id;
  }

  const moment = await repository.createMoment({
    creator: userId,
    shop: shopId,
    title: data.title || data.description?.substring(0, 50) || "Moment",
    description: data.description || "",
    mediaUrl: data.mediaUrl || data.videoUrl,
    mediaType: data.mediaType || "video",
    thumbnailUrl: data.thumbnailUrl || "",
    type: data.type || MOMENT_TYPE.FOOD_REVIEW,
    status: data.status || MOMENT_STATUS.DRAFT,
  });

  return moment;
}

export const getFeed = () => repository.findFeed();

export const getShopMoments = (shopId) => repository.findByShop(shopId);

export const likeMoment = async (momentId) => {
  const moment = await repository.incrementLikes(momentId);

  if (!moment) {
    throw new Error("Moment not found.");
  }

  return moment;
};

export const viewMoment = async (momentId) => {
  const moment = await repository.incrementViews(momentId);

  if (!moment) {
    throw new Error("Moment not found.");
  }

  return moment;
};

export const trackShopClick = async (momentId) => {
  const moment = await repository.incrementShopClicks(momentId);

  if (!moment) {
    throw new Error("Moment not found.");
  }

  return moment;
};
