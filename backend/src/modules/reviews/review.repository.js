import mongoose from "mongoose";
import Review from "./review.model.js";
import ReviewHelpful from "./models/reviewHelpful.model.js";
import ReviewReport from "./models/reviewReport.model.js";
import Shop from "../shops/shop.model.js";

export const create = (data) => Review.create(data);

export const findById = (id) =>
  Review.findById(id)
    .populate("customer", "firstName lastName name profileImage avatar")
    .populate("shop", "name logo owner");

export const findExistingReviewForOrder = (orderId, customerId, shopId) => {
  const query = { customer: customerId };
  if (orderId) query.order = orderId;
  if (shopId) query.shop = shopId;
  return Review.findOne(query);
};

export const findByShop = async (shopId, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sort = "newest",
    rating = null,
    verified = null,
  } = options;

  const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);
  const parsedLimit = Math.min(50, Math.max(1, parseInt(limit)));

  const query = {
    shop: new mongoose.Types.ObjectId(shopId),
    status: "ACTIVE",
  };

  if (rating && !isNaN(parseInt(rating))) {
    query.rating = parseInt(rating);
  }

  if (verified === "true" || verified === true) {
    query.isVerifiedPurchase = true;
  }

  let sortOption = { createdAt: -1 };
  if (sort === "oldest") {
    sortOption = { createdAt: 1 };
  } else if (sort === "highest") {
    sortOption = { rating: -1, createdAt: -1 };
  } else if (sort === "lowest") {
    sortOption = { rating: 1, createdAt: -1 };
  } else if (sort === "helpful") {
    sortOption = { helpfulCount: -1, createdAt: -1 };
  }

  const [reviews, totalCount] = await Promise.all([
    Review.find(query)
      .populate("customer", "firstName lastName name profileImage avatar")
      .sort(sortOption)
      .skip(skip)
      .limit(parsedLimit)
      .lean(),
    Review.countDocuments(query),
  ]);

  return {
    reviews,
    totalCount,
    page: parseInt(page),
    limit: parsedLimit,
    totalPages: Math.ceil(totalCount / parsedLimit) || 1,
  };
};

export const findByCustomer = (customerId, options = {}) => {
  const { page = 1, limit = 20 } = options;
  const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);

  return Review.find({ customer: customerId })
    .populate("shop", "name logo slug coverImage address")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
};

export const update = (id, data) =>
  Review.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });

export const remove = (id) => Review.findByIdAndDelete(id);

export const recalculateShopRating = async (shopId) => {
  const objectShopId = new mongoose.Types.ObjectId(shopId);

  const stats = await Review.aggregate([
    {
      $match: {
        shop: objectShopId,
        status: "ACTIVE",
      },
    },
    {
      $group: {
        _id: "$shop",
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
        star5: { $sum: { $cond: [{ $eq: ["$rating", 5] }, 1, 0] } },
        star4: { $sum: { $cond: [{ $eq: ["$rating", 4] }, 1, 0] } },
        star3: { $sum: { $cond: [{ $eq: ["$rating", 3] }, 1, 0] } },
        star2: { $sum: { $cond: [{ $eq: ["$rating", 2] }, 1, 0] } },
        star1: { $sum: { $cond: [{ $eq: ["$rating", 1] }, 1, 0] } },
      },
    },
  ]);

  if (!stats || stats.length === 0) {
    await Shop.findByIdAndUpdate(shopId, {
      $set: {
        averageRating: 0,
        reviewCount: 0,
        ratingDistribution: {
          star1: 0,
          star2: 0,
          star3: 0,
          star4: 0,
          star5: 0,
        },
      },
    });
    return {
      averageRating: 0,
      reviewCount: 0,
      ratingDistribution: { star1: 0, star2: 0, star3: 0, star4: 0, star5: 0 },
    };
  }

  const { averageRating, reviewCount, star1, star2, star3, star4, star5 } =
    stats[0];

  const roundedAverage = Math.round(averageRating * 10) / 10;

  const distribution = {
    star1,
    star2,
    star3,
    star4,
    star5,
  };

  await Shop.findByIdAndUpdate(shopId, {
    $set: {
      averageRating: roundedAverage,
      reviewCount,
      ratingDistribution: distribution,
    },
  });

  return {
    averageRating: roundedAverage,
    reviewCount,
    ratingDistribution: distribution,
  };
};

export const hasUserVotedHelpful = async (reviewId, userId) => {
  return await ReviewHelpful.exists({ review: reviewId, user: userId });
};

export const addHelpfulVote = async (reviewId, userId) => {
  await ReviewHelpful.create({ review: reviewId, user: userId });
  return await Review.findByIdAndUpdate(
    reviewId,
    { $inc: { helpfulCount: 1 } },
    { new: true }
  );
};

export const removeHelpfulVote = async (reviewId, userId) => {
  await ReviewHelpful.findOneAndDelete({ review: reviewId, user: userId });
  return await Review.findByIdAndUpdate(
    reviewId,
    { $inc: { helpfulCount: -1 } },
    { new: true }
  );
};

export const hasUserReported = async (reviewId, userId) => {
  return await ReviewReport.exists({ review: reviewId, reporter: userId });
};

export const createReport = async (reviewId, userId, reason, details) => {
  const report = await ReviewReport.create({
    review: reviewId,
    reporter: userId,
    reason,
    details,
  });

  await Review.findByIdAndUpdate(reviewId, {
    $inc: { reportCount: 1 },
    $set: { status: "REPORTED" },
  });

  return report;
};

export const findAllAdmin = async (options = {}) => {
  const { page = 1, limit = 20, status = null } = options;
  const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);

  const query = {};
  if (status) {
    query.status = status;
  }

  const [reviews, totalCount] = await Promise.all([
    Review.find(query)
      .populate("customer", "firstName lastName name email")
      .populate("shop", "name slug logo")
      .sort({ reportCount: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    Review.countDocuments(query),
  ]);

  return {
    reviews,
    totalCount,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(totalCount / parseInt(limit)) || 1,
  };
};
