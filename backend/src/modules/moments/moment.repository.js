import Moment from "./moment.model.js";
import MomentComment from "./models/momentComment.model.js";
import MomentReport from "./models/momentReport.model.js";
import MomentStory from "./models/momentStory.model.js";
import MomentSocial from "./moment.social.model.js";
import { MOMENT_STATUS } from "./moment.constants.js";

const POPULATE_FIELDS = [
  { path: "creator", select: "fullName name profileImage role" },
  { path: "shop", select: "name slug logo averageRating address owner" },
  {
    path: "productId",
    select: "name price discountedPrice images available inventory category shop",
  },
  {
    path: "productIds",
    select: "name price discountedPrice images available inventory category shop",
  },
];

export const createMoment = (data) => Moment.create(data);

export const findMomentById = (id) =>
  Moment.findById(id).populate(POPULATE_FIELDS);

export const findForYouFeed = async ({ page = 1, limit = 10, search = "" }) => {
  const skip = (page - 1) * limit;
  const filter = { status: MOMENT_STATUS.PUBLISHED };

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { hashtags: { $in: [search.toLowerCase().replace(/^#/, "")] } },
    ];
  }

  const moments = await Moment.find(filter)
    .populate(POPULATE_FIELDS)
    .sort({ isFeatured: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Moment.countDocuments(filter);
  return { moments, total, page, totalPages: Math.ceil(total / limit) };
};

export const findFollowingFeed = async ({ followedShopIds = [], followedUserIds = [], page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const filter = {
    status: MOMENT_STATUS.PUBLISHED,
    $or: [
      { shop: { $in: followedShopIds } },
      { creator: { $in: followedUserIds } },
    ],
  };

  const moments = await Moment.find(filter)
    .populate(POPULATE_FIELDS)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Moment.countDocuments(filter);
  return { moments, total, page, totalPages: Math.ceil(total / limit) };
};

export const findNearbyFeed = async ({ location = "", page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const filter = { status: MOMENT_STATUS.PUBLISHED };

  if (location) {
    filter.$or = [
      { location: { $regex: location, $options: "i" } },
      { description: { $regex: location, $options: "i" } },
    ];
  }

  const moments = await Moment.find(filter)
    .populate(POPULATE_FIELDS)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Moment.countDocuments(filter);
  return { moments, total, page, totalPages: Math.ceil(total / limit) };
};

export const findTrendingFeed = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const filter = { status: MOMENT_STATUS.PUBLISHED };

  // Sort by high engagement: likes + comments + shares + views
  const moments = await Moment.find(filter)
    .populate(POPULATE_FIELDS)
    .sort({ likes: -1, views: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Moment.countDocuments(filter);
  return { moments, total, page, totalPages: Math.ceil(total / limit) };
};

export const findShopMoments = async (shopId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const filter = { shop: shopId, status: MOMENT_STATUS.PUBLISHED };

  const moments = await Moment.find(filter)
    .populate(POPULATE_FIELDS)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Moment.countDocuments(filter);
  return { moments, total, page, totalPages: Math.ceil(total / limit) };
};

export const findProductMoments = async (productId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const filter = {
    status: MOMENT_STATUS.PUBLISHED,
    $or: [{ productId: productId }, { productIds: productId }],
  };

  const moments = await Moment.find(filter)
    .populate(POPULATE_FIELDS)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Moment.countDocuments(filter);
  return { moments, total, page, totalPages: Math.ceil(total / limit) };
};

export const incrementLikes = (id) =>
  Moment.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });

export const decrementLikes = (id) =>
  Moment.findByIdAndUpdate(
    id,
    { $inc: { likes: -1 } },
    { new: true }
  );

export const incrementSaves = (id) =>
  Moment.findByIdAndUpdate(id, { $inc: { savesCount: 1 } }, { new: true });

export const decrementSaves = (id) =>
  Moment.findByIdAndUpdate(id, { $inc: { savesCount: -1 } }, { new: true });

export const incrementViews = (id) =>
  Moment.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });

export const incrementShopClicks = (id) =>
  Moment.findByIdAndUpdate(id, { $inc: { shopClicks: 1 } }, { new: true });

export const incrementProductClicks = (id) =>
  Moment.findByIdAndUpdate(id, { $inc: { productClicks: 1 } }, { new: true });

export const incrementCartAdditions = (id) =>
  Moment.findByIdAndUpdate(id, { $inc: { cartAdditions: 1 } }, { new: true });

export const incrementOrdersGenerated = (id) =>
  Moment.findByIdAndUpdate(id, { $inc: { orderGenerated: 1 } }, { new: true });

// Comments
export const createComment = async (data) => {
  const comment = await MomentComment.create(data);
  await Moment.findByIdAndUpdate(data.moment, { $inc: { commentsCount: 1 } });
  return MomentComment.findById(comment._id).populate("user", "fullName name profileImage");
};

export const findCommentsByMoment = (momentId) =>
  MomentComment.find({ moment: momentId, status: "ACTIVE" })
    .populate("user", "fullName name profileImage")
    .sort({ createdAt: -1 });

export const deleteComment = async (commentId, userId) => {
  const comment = await MomentComment.findById(commentId);
  if (!comment) return null;

  if (comment.user.toString() !== userId.toString()) {
    throw new Error("Unauthorized to delete this comment");
  }

  comment.status = "REMOVED";
  await comment.save();
  await Moment.findByIdAndUpdate(comment.moment, { $inc: { commentsCount: -1 } });
  return comment;
};

// Reports
export const createReport = (data) => MomentReport.create(data);

// Stories
export const createStory = (data) => MomentStory.create(data);

export const findActiveStories = () =>
  MomentStory.find()
    .populate("creator", "fullName name profileImage")
    .populate("shop", "name slug logo")
    .sort({ createdAt: -1 });

// Admin Moderation
export const adminFindMoments = async ({ status, page = 1, limit = 20 }) => {
  const skip = (page - 1) * limit;
  const filter = status ? { status } : {};

  const moments = await Moment.find(filter)
    .populate(POPULATE_FIELDS)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Moment.countDocuments(filter);
  return { moments, total, page, totalPages: Math.ceil(total / limit) };
};

export const updateMomentStatus = (id, status) =>
  Moment.findByIdAndUpdate(id, { status }, { new: true }).populate(POPULATE_FIELDS);

export const toggleFeatureMoment = async (id) => {
  const moment = await Moment.findById(id);
  if (!moment) return null;
  moment.isFeatured = !moment.isFeatured;
  await moment.save();
  return moment;
};
