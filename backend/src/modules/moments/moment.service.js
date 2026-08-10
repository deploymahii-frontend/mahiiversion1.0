import mongoose from "mongoose";
import * as repository from "./moment.repository.js";
import Shop from "../shops/shop.model.js";
import Product from "../products/product.model.js";
import MomentSocial from "./moment.social.model.js";
import MomentReport from "./models/momentReport.model.js";
import { createNotification } from "../notifications/notification.service.js";
import { MOMENT_STATUS, MOMENT_TYPE, CREATOR_TYPE } from "./moment.constants.js";

const toObjectId = (value) => {
  if (!value) return null;
  if (mongoose.Types.ObjectId.isValid(value)) {
    return new mongoose.Types.ObjectId(value);
  }
  return value;
};

export async function createMoment(userId, userRole, data) {
  if (!data.title && !data.description && !data.caption) {
    const error = new Error("Title or caption is required for a moment.");
    error.statusCode = 400;
    throw error;
  }

  if (!data.mediaUrl && !data.videoUrl) {
    const error = new Error("Media URL is required for a moment.");
    error.statusCode = 400;
    throw error;
  }

  const userRoleStr = String(userRole || "").toUpperCase();
  const isOwner =
    userRoleStr === "SHOP_OWNER" ||
    userRoleStr === "SHOPOWNER" ||
    data.creatorType === CREATOR_TYPE.SHOP_OWNER;

  let shopId = null;
  let ownerShop = null;

  if (isOwner) {
    ownerShop = await Shop.findOne({ owner: userId });
    if (ownerShop) {
      shopId = ownerShop._id;
    }
  } else if (data.shop || data.shopId) {
    const sId = data.shop || data.shopId;
    const shop = await Shop.findById(sId);
    if (shop) shopId = shop._id;
  }

  // Security Check: Tagged products validation
  const productIds = [];
  const rawProductIds = Array.isArray(data.productIds)
    ? data.productIds
    : [data.productId].filter(Boolean);

  for (const pId of rawProductIds) {
    if (!pId) continue;
    const product = await Product.findById(pId);
    if (!product) continue;

    // Rule 9: If Shop Owner creates a moment, verify product belongs to their shop
    if (isOwner && ownerShop) {
      const prodShopId = product.shop?._id ? product.shop._id.toString() : String(product.shop);
      if (prodShopId !== ownerShop._id.toString()) {
        const error = new Error("Forbidden: Cannot tag products from another shop");
        error.statusCode = 403;
        throw error;
      }
    }
    productIds.push(product._id);
  }

  const primaryProductId = productIds[0] || null;

  const captionText = data.caption || data.description || data.title || "";
  const title = data.title || captionText.substring(0, 80) || "Mahii Moment";
  const hashtags = Array.isArray(data.hashtags)
    ? data.hashtags.filter(Boolean).map((tag) => tag.replace(/^#/, "").toLowerCase())
    : captionText.match(/#[\w-]+/g)?.map((t) => t.replace(/^#/, "").toLowerCase()) || [];

  const moment = await repository.createMoment({
    creator: userId,
    creatorType: isOwner ? CREATOR_TYPE.SHOP_OWNER : CREATOR_TYPE.CUSTOMER,
    shop: shopId,
    productId: primaryProductId,
    productIds,
    title,
    description: captionText,
    mediaUrl: data.mediaUrl || data.videoUrl,
    mediaType: data.mediaType || "image",
    thumbnailUrl: data.thumbnailUrl || "",
    type: data.type || (isOwner ? MOMENT_TYPE.SHOP_PROMOTION : MOMENT_TYPE.FOOD_REVIEW),
    status: data.status || MOMENT_STATUS.PUBLISHED,
    location: data.location || "",
    hashtags,
    offerId: data.offerId || null,
  });

  return repository.findMomentById(moment._id);
}

export async function getFeed(query = {}, user = null) {
  const feedType = (query.type || "for_you").toLowerCase();
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const search = query.search || "";
  const location = query.location || "";

  let feedResult;

  switch (feedType) {
    case "following": {
      // Find followed shops/users for authenticated user
      let followedShopIds = [];
      let followedUserIds = [];
      if (user?._id) {
        const follows = await MomentSocial.find({
          user: user._id,
          type: "FOLLOW",
        });
        followedShopIds = follows.map((f) => f.moment).filter(Boolean);
      }
      feedResult = await repository.findFollowingFeed({
        followedShopIds,
        followedUserIds,
        page,
        limit,
      });
      break;
    }
    case "nearby": {
      feedResult = await repository.findNearbyFeed({
        location,
        page,
        limit,
      });
      break;
    }
    case "trending": {
      feedResult = await repository.findTrendingFeed({ page, limit });
      break;
    }
    case "for_you":
    default: {
      feedResult = await repository.findForYouFeed({ page, limit, search });
      break;
    }
  }

  // If user is authenticated, attach user-specific interaction flags
  if (user?._id && feedResult.moments.length > 0) {
    const momentIds = feedResult.moments.map((m) => m._id);
    const socialRecords = await MomentSocial.find({
      user: user._id,
      moment: { $in: momentIds },
    });

    const socialMap = {};
    socialRecords.forEach((sr) => {
      if (!socialMap[sr.moment.toString()]) {
        socialMap[sr.moment.toString()] = {};
      }
      socialMap[sr.moment.toString()][sr.type] = true;
    });

    const enrichedMoments = feedResult.moments.map((m) => {
      const mObj = m.toObject();
      const userFlags = socialMap[m._id.toString()] || {};
      return {
        ...mObj,
        liked: !!userFlags.LIKE,
        saved: !!userFlags.SAVE,
        following: !!userFlags.FOLLOW,
      };
    });

    return { ...feedResult, moments: enrichedMoments };
  }

  return feedResult;
}

export const getShopMoments = (shopId, query = {}) =>
  repository.findShopMoments(shopId, parseInt(query.page, 10) || 1, parseInt(query.limit, 10) || 10);

export const getProductMoments = (productId, query = {}) =>
  repository.findProductMoments(productId, parseInt(query.page, 10) || 1, parseInt(query.limit, 10) || 10);

export const getMomentById = async (id, user = null) => {
  const moment = await repository.findMomentById(id);
  if (!moment) {
    const error = new Error("Moment not found");
    error.statusCode = 404;
    throw error;
  }

  let liked = false;
  let saved = false;

  if (user?._id) {
    const likes = await MomentSocial.findOne({ moment: id, user: user._id, type: "LIKE" });
    const saves = await MomentSocial.findOne({ moment: id, user: user._id, type: "SAVE" });
    liked = !!likes;
    saved = !!saves;
  }

  return { ...moment.toObject(), liked, saved };
};

export const likeMoment = async (userId, momentId) => {
  if (!userId) {
    const moment = await repository.incrementLikes(momentId);
    if (!moment) throw new Error("Moment not found");
    return { liked: true, likes: moment.likes };
  }

  const existing = await MomentSocial.findOne({
    moment: toObjectId(momentId),
    user: toObjectId(userId),
    type: "LIKE",
  });

  if (existing) {
    await existing.deleteOne();
    const moment = await repository.decrementLikes(momentId);
    return { liked: false, likes: moment?.likes ?? 0 };
  }

  await MomentSocial.create({
    moment: toObjectId(momentId),
    user: toObjectId(userId),
    type: "LIKE",
  });
  const moment = await repository.incrementLikes(momentId);

  if (!moment) throw new Error("Moment not found");

  // Send notification to creator
  if (moment.creator) {
    await createNotification({
      recipient: moment.creator,
      type: "REVIEW",
      title: "Someone liked your moment",
      message: "A customer liked your moment.",
      data: { momentId },
    }).catch(() => {});
  }

  return { liked: true, likes: moment.likes };
};

export const saveMoment = async (userId, momentId) => {
  const existing = await MomentSocial.findOne({
    moment: toObjectId(momentId),
    user: toObjectId(userId),
    type: "SAVE",
  });

  if (existing) {
    await existing.deleteOne();
    await repository.decrementSaves(momentId);
    return { saved: false };
  }

  await MomentSocial.create({
    moment: toObjectId(momentId),
    user: toObjectId(userId),
    type: "SAVE",
  });
  await repository.incrementSaves(momentId);
  return { saved: true };
};

export const getSavedMoments = async (userId, query = {}) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const saves = await MomentSocial.find({ user: userId, type: "SAVE" })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const momentIds = saves.map((s) => s.moment);
  const moments = await repository.findForYouFeed({ page: 1, limit: limit });
  const filtered = moments.moments.filter((m) => momentIds.some((id) => id.toString() === m._id.toString()));

  return { moments: filtered, page, limit };
};

export const commentOnMoment = async (userId, momentId, data) => {
  const text = data.text || data.value;
  if (!text || !text.trim()) {
    const error = new Error("Comment text is required.");
    error.statusCode = 400;
    throw error;
  }

  const comment = await repository.createComment({
    moment: toObjectId(momentId),
    user: toObjectId(userId),
    text: text.trim(),
    parentComment: data.parentCommentId || null,
  });

  const moment = await repository.findMomentById(momentId);
  if (moment?.creator) {
    await createNotification({
      recipient: moment.creator._id || moment.creator,
      type: "REVIEW",
      title: "New comment on your moment",
      message: `${comment.user?.name || "Someone"} commented on your moment.`,
      data: { momentId },
    }).catch(() => {});
  }

  return comment;
};

export const getComments = (momentId) => repository.findCommentsByMoment(momentId);

export const deleteComment = (commentId, userId) => repository.deleteComment(commentId, userId);

export const viewMoment = (momentId) => repository.incrementViews(momentId);

export const trackShopClick = (momentId) => repository.incrementShopClicks(momentId);

export const trackProductClick = (momentId) => repository.incrementProductClicks(momentId);

export const trackCartAddition = (momentId) => repository.incrementCartAdditions(momentId);

export const reportMoment = async (userId, momentId, data) => {
  const existing = await MomentReport.findOne({ moment: momentId, reporter: userId });
  if (existing) {
    const error = new Error("You have already reported this moment.");
    error.statusCode = 409;
    throw error;
  }

  const report = await repository.createReport({
    moment: momentId,
    reporter: userId,
    reason: data.reason,
    details: data.details || "",
  });

  return report;
};

// Owner Analytics
export async function getOwnerAnalytics(userId) {
  const shop = await Shop.findOne({ owner: userId });
  if (!shop) {
    const error = new Error("Shop profile not found for this owner.");
    error.statusCode = 404;
    throw error;
  }

  const res = await repository.findShopMoments(shop._id, 1, 100);
  const moments = res.moments || [];

  const totals = moments.reduce(
    (acc, m) => {
      acc.totalViews += m.views || 0;
      acc.totalLikes += m.likes || 0;
      acc.totalComments += m.commentsCount || 0;
      acc.totalShares += m.shares || 0;
      acc.totalSaves += m.savesCount || 0;
      acc.totalProductClicks += m.productClicks || 0;
      acc.totalShopClicks += m.shopClicks || 0;
      acc.totalCartAdditions += m.cartAdditions || 0;
      acc.totalOrdersGenerated += m.orderGenerated || 0;
      return acc;
    },
    {
      totalMoments: moments.length,
      totalViews: 0,
      totalLikes: 0,
      totalComments: 0,
      totalShares: 0,
      totalSaves: 0,
      totalProductClicks: 0,
      totalShopClicks: 0,
      totalCartAdditions: 0,
      totalOrdersGenerated: 0,
    }
  );

  return { shop, totals, moments };
}

// Stories
export const createStory = async (userId, userRole, data) => {
  let shopId = null;
  if (userRole === "SHOP_OWNER" || userRole === "SHOPOWNER") {
    const shop = await Shop.findOne({ owner: userId });
    if (shop) shopId = shop._id;
  }
  return repository.createStory({
    creator: userId,
    shop: shopId,
    mediaUrl: data.mediaUrl,
    mediaType: data.mediaType || "image",
    caption: data.caption || "",
    productId: data.productId || null,
  });
};

export const getActiveStories = () => repository.findActiveStories();

// Admin Moderation
export const adminGetMoments = (query = {}) =>
  repository.adminFindMoments({
    status: query.status,
    page: parseInt(query.page, 10) || 1,
    limit: parseInt(query.limit, 10) || 20,
  });

export const adminUpdateStatus = (id, status) => repository.updateMomentStatus(id, status);

export const adminToggleFeatured = (id) => repository.toggleFeatureMoment(id);
