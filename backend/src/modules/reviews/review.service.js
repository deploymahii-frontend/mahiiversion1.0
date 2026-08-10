import * as repository from "./review.repository.js";
import Order from "../orders/order.model.js";
import Shop from "../shops/shop.model.js";
import { createNotification } from "../notifications/notification.service.js";
import { ORDER_STATUS } from "../orders/order.constants.js";

export const createReview = async (data, currentUser) => {
  const shopId = data.shopId || data.shop;
  const orderId = data.orderId || data.order;
  const rating = Number(data.rating);
  const title = data.title || "";
  const comment = data.comment || data.review || "";
  const images = data.images || [];

  if (!orderId) {
    const error = new Error("Order ID is required to post a verified review");
    error.statusCode = 400;
    throw error;
  }

  // Find and verify order
  const order = await Order.findById(orderId);
  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 44;
    throw error;
  }

  // Security check: order must belong to authenticated user
  const orderCustomerId = order.customer._id
    ? order.customer._id.toString()
    : order.customer.toString();
  if (orderCustomerId !== currentUser._id.toString()) {
    const error = new Error("You can only review your own orders");
    error.statusCode = 403;
    throw error;
  }

  // Security check: order shop must match requested shop
  const orderShopId = order.shop._id
    ? order.shop._id.toString()
    : order.shop.toString();
  if (orderShopId !== shopId.toString()) {
    const error = new Error("Order does not belong to this shop");
    error.statusCode = 400;
    throw error;
  }

  // Security check: order must be completed (DELIVERED)
  if (order.orderStatus !== ORDER_STATUS.DELIVERED) {
    const error = new Error(
      "Only completed / delivered orders can be reviewed"
    );
    error.statusCode = 400;
    throw error;
  }

  // Check duplicate review
  const existingReview = await repository.findExistingReviewForOrder(
    orderId,
    currentUser._id,
    shopId
  );

  if (existingReview) {
    const error = new Error("You have already reviewed this order");
    error.statusCode = 409;
    error.code = "REVIEW_ALREADY_EXISTS";
    throw error;
  }

  const reviewData = {
    shop: shopId,
    customer: currentUser._id,
    order: orderId,
    rating,
    title,
    comment,
    review: comment,
    images,
    isVerifiedPurchase: true,
    status: "ACTIVE",
  };

  const review = await repository.create(reviewData);

  // Recalculate shop rating aggregate
  await repository.recalculateShopRating(shopId);

  return review;
};

export const checkOrderEligibility = async (orderId, currentUser) => {
  const order = await Order.findById(orderId).populate("shop", "name logo");
  if (!order) {
    return { eligible: false, message: "Order not found" };
  }

  const orderCustomerId = order.customer._id
    ? order.customer._id.toString()
    : order.customer.toString();

  if (orderCustomerId !== currentUser._id.toString()) {
    return { eligible: false, message: "Order belongs to another user" };
  }

  if (order.orderStatus !== ORDER_STATUS.DELIVERED) {
    return {
      eligible: false,
      message: "Order must be delivered before writing a review",
    };
  }

  const shopId = order.shop._id
    ? order.shop._id.toString()
    : order.shop.toString();

  const existingReview = await repository.findExistingReviewForOrder(
    orderId,
    currentUser._id,
    shopId
  );

  if (existingReview) {
    return {
      eligible: false,
      alreadyReviewed: true,
      review: existingReview,
      shop: order.shop,
    };
  }

  return {
    eligible: true,
    alreadyReviewed: false,
    orderId: order._id,
    shop: order.shop,
  };
};

export const getShopReviews = async (shopId, options = {}) => {
  const result = await repository.findByShop(shopId, options);
  const shopStats = await Shop.findById(shopId).select(
    "averageRating reviewCount ratingDistribution name logo"
  );
  return {
    ...result,
    shopSummary: shopStats,
  };
};

export const getCustomerReviews = async (customerId, options = {}) => {
  return repository.findByCustomer(customerId, options);
};

export const updateReview = async (reviewId, updateData, currentUser) => {
  const review = await repository.findById(reviewId);
  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  const customerId = review.customer._id
    ? review.customer._id.toString()
    : review.customer.toString();

  if (customerId !== currentUser._id.toString()) {
    const error = new Error("Forbidden. You can only update your own review");
    error.statusCode = 403;
    throw error;
  }

  const allowedUpdates = {};
  if (updateData.rating !== undefined)
    allowedUpdates.rating = Number(updateData.rating);
  if (updateData.title !== undefined) allowedUpdates.title = updateData.title;
  if (updateData.comment !== undefined) {
    allowedUpdates.comment = updateData.comment;
    allowedUpdates.review = updateData.comment;
  } else if (updateData.review !== undefined) {
    allowedUpdates.comment = updateData.review;
    allowedUpdates.review = updateData.review;
  }
  if (updateData.images !== undefined)
    allowedUpdates.images = updateData.images;

  const updatedReview = await repository.update(reviewId, allowedUpdates);
  await repository.recalculateShopRating(review.shop);

  return updatedReview;
};

export const deleteReview = async (reviewId, currentUser) => {
  const review = await repository.findById(reviewId);
  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  const customerId = review.customer._id
    ? review.customer._id.toString()
    : review.customer.toString();
  const userRole = currentUser.role?.name || currentUser.role;

  if (
    customerId !== currentUser._id.toString() &&
    userRole?.toUpperCase() !== "ADMIN" &&
    userRole?.toUpperCase() !== "SUPER_ADMIN"
  ) {
    const error = new Error("Forbidden. You can only delete your own review");
    error.statusCode = 403;
    throw error;
  }

  const shopId = review.shop._id || review.shop;
  await repository.remove(reviewId);
  await repository.recalculateShopRating(shopId);

  return { success: true };
};

export const toggleHelpful = async (reviewId, currentUser) => {
  const hasVoted = await repository.hasUserVotedHelpful(
    reviewId,
    currentUser._id
  );

  if (hasVoted) {
    const updatedReview = await repository.removeHelpfulVote(
      reviewId,
      currentUser._id
    );
    return { helpful: false, helpfulCount: updatedReview.helpfulCount };
  } else {
    const updatedReview = await repository.addHelpfulVote(
      reviewId,
      currentUser._id
    );
    return { helpful: true, helpfulCount: updatedReview.helpfulCount };
  }
};

export const reportReview = async (reviewId, currentUser, reportData) => {
  const { reason, details = "" } = reportData;

  const alreadyReported = await repository.hasUserReported(
    reviewId,
    currentUser._id
  );

  if (alreadyReported) {
    const error = new Error("You have already reported this review");
    error.statusCode = 400;
    throw error;
  }

  const report = await repository.createReport(
    reviewId,
    currentUser._id,
    reason,
    details
  );

  return report;
};

export const replyToReview = async (reviewId, currentUser, replyData) => {
  const { comment } = replyData;

  const review = await repository.findById(reviewId);
  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  const shop = await Shop.findById(review.shop._id || review.shop);
  if (!shop) {
    const error = new Error("Associated shop not found");
    error.statusCode = 404;
    throw error;
  }

  const ownerId = shop.owner._id ? shop.owner._id.toString() : shop.owner.toString();
  const userRole = currentUser.role?.name || currentUser.role;

  if (
    ownerId !== currentUser._id.toString() &&
    userRole?.toUpperCase() !== "ADMIN" &&
    userRole?.toUpperCase() !== "SUPER_ADMIN"
  ) {
    const error = new Error(
      "Forbidden. Only the shop owner can reply to reviews for this shop"
    );
    error.statusCode = 403;
    throw error;
  }

  const now = new Date();
  const replyObj = {
    comment,
    repliedAt: review.ownerReply?.repliedAt || now,
    updatedAt: now,
  };

  const updatedReview = await repository.update(reviewId, {
    ownerReply: replyObj,
  });

  // Notify customer
  try {
    const customerId = review.customer._id || review.customer;
    await createNotification({
      recipient: customerId,
      type: "REVIEW",
      title: `${shop.name} replied to your review`,
      message: comment,
      data: { reviewId, shopId: shop._id },
    });
  } catch (err) {
    console.error("Failed to send review reply notification", err);
  }

  return updatedReview;
};

export const deleteOwnerReply = async (reviewId, currentUser) => {
  const review = await repository.findById(reviewId);
  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  const shop = await Shop.findById(review.shop._id || review.shop);
  const ownerId = shop.owner._id ? shop.owner._id.toString() : shop.owner.toString();
  const userRole = currentUser.role?.name || currentUser.role;

  if (
    ownerId !== currentUser._id.toString() &&
    userRole?.toUpperCase() !== "ADMIN" &&
    userRole?.toUpperCase() !== "SUPER_ADMIN"
  ) {
    const error = new Error("Forbidden. Only the shop owner can delete reply");
    error.statusCode = 403;
    throw error;
  }

  const updatedReview = await repository.update(reviewId, {
    ownerReply: { comment: null, repliedAt: null, updatedAt: null },
  });

  return updatedReview;
};

export const adminGetReviews = async (options) => {
  return repository.findAllAdmin(options);
};

export const adminUpdateStatus = async (reviewId, status) => {
  const review = await repository.findById(reviewId);
  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  const updatedReview = await repository.update(reviewId, { status });
  await repository.recalculateShopRating(review.shop._id || review.shop);
  return updatedReview;
};
