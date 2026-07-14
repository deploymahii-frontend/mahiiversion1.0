import * as repository from "./moment.repository.js";
import Shop from "../shops/shop.model.js";
import { MOMENT_STATUS, MOMENT_TYPE } from "./moment.constants.js";

export async function createMoment(userId, data) {
  if (!data.shop) {
    throw new Error("Shop is required for each moment.");
  }

  if (!data.title) {
    throw new Error("Title is required for a moment.");
  }

  if (!data.videoUrl) {
    throw new Error("Video URL is required for a moment.");
  }

  const shop = await Shop.findById(data.shop);

  if (!shop) {
    throw new Error("Shop not found.");
  }

  const moment = await repository.createMoment({
    creator: userId,
    shop: data.shop,
    title: data.title,
    description: data.description || "",
    videoUrl: data.videoUrl,
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
