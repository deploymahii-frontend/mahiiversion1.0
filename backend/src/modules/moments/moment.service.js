import mongoose from "mongoose";
import * as repository from "./moment.repository.js";
import Shop from "../shops/shop.model.js";
import MomentSocial from "./moment.social.model.js";
import { createNotification } from "../notifications/notification.service.js";
import { MOMENT_STATUS, MOMENT_TYPE } from "./moment.constants.js";

const toObjectId = (value) => {
  if (!value) return null;
  if (mongoose.Types.ObjectId.isValid(value)) {
    return new mongoose.Types.ObjectId(value);
  }
  return value;
};

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

  const title = data.title || data.description?.substring(0, 80) || "Mahii Moment";
  const description = data.description || data.caption || "";
  const hashtags = Array.isArray(data.hashtags)
    ? data.hashtags.filter(Boolean).map((tag) => tag.replace(/^#/, ""))
    : [];

  const moment = await repository.createMoment({
    creator: userId,
    shop: shopId,
    title,
    description,
    mediaUrl: data.mediaUrl || data.videoUrl,
    mediaType: data.mediaType || "video",
    thumbnailUrl: data.thumbnailUrl || "",
    type: data.type || MOMENT_TYPE.SHOP_PROMOTION,
    status: data.status || MOMENT_STATUS.PUBLISHED,
    location: data.location || "",
    hashtags,
    productId: data.productId || null,
    offerId: data.offerId || null,
  });

  return moment;
}

export const getFeed = () => repository.findFeed();

export const getShopMoments = (shopId) => repository.findByShop(shopId);

export const likeMoment = async (userId, momentId) => {
  const existing = await MomentSocial.findOne({ moment: toObjectId(momentId), user: toObjectId(userId), type: "LIKE" });

  if (existing) {
    await existing.deleteOne();
    const moment = await repository.decrementLikes(momentId);
    return { liked: false, likes: moment?.likes ?? 0 };
  }

  await MomentSocial.create({ moment: toObjectId(momentId), user: toObjectId(userId), type: "LIKE" });
  const moment = await repository.incrementLikes(momentId);

  if (!moment) {
    throw new Error("Moment not found.");
  }

  return { liked: true, likes: moment.likes };
};

export const viewMoment = async (momentId) => {
  const moment = await repository.incrementViews(momentId);

  if (!moment) {
    throw new Error("Moment not found.");
  }

  return moment;
};

export const saveMoment = async (userId, momentId) => {
  const existing = await MomentSocial.findOne({ moment: toObjectId(momentId), user: toObjectId(userId), type: "SAVE" });

  if (existing) {
    await existing.deleteOne();
    return { saved: false };
  }

  await MomentSocial.create({ moment: toObjectId(momentId), user: toObjectId(userId), type: "SAVE" });
  return { saved: true };
};

export const followMomentShop = async (userId, momentId) => {
  const existing = await MomentSocial.findOne({ moment: toObjectId(momentId), user: toObjectId(userId), type: "FOLLOW" });

  if (existing) {
    await existing.deleteOne();
    return { following: false };
  }

  await MomentSocial.create({ moment: toObjectId(momentId), user: toObjectId(userId), type: "FOLLOW" });
  return { following: true };
};

export const commentOnMoment = async (userId, momentId, value) => {
  if (!value || !value.trim()) {
    throw new Error("Comment text is required.");
  }

  const comment = await MomentSocial.create({ moment: toObjectId(momentId), user: toObjectId(userId), type: "COMMENT", value: value.trim() });
  const moment = await repository.findMomentById(momentId);

  if (moment?.creator) {
    await createNotification({
      recipient: moment.creator._id,
      type: "REVIEW",
      title: "New comment on your moment",
      message: "Someone commented on your moment.",
      data: { momentId },
    });
  }

  return comment;
};

export const trackShopClick = async (momentId) => {
  const moment = await repository.incrementShopClicks(momentId);

  if (!moment) {
    throw new Error("Moment not found.");
  }

  return moment;
};
