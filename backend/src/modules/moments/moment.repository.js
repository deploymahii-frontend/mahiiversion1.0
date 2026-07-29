import Moment from "./moment.model.js";
import { MOMENT_STATUS } from "./moment.constants.js";

export const createMoment = (data) => Moment.create(data);

export const findMomentById = (id) =>
  Moment.findById(id)
    .populate("creator", "fullName email mobile")
    .populate("shop", "name slug");

export const findFeed = () =>
  Moment.find({ status: MOMENT_STATUS.PUBLISHED })
    .populate("creator", "fullName")
    .populate("shop", "name slug")
    .sort({ createdAt: -1 });

export const findByShop = (shopId) =>
  Moment.find({ shop: shopId, status: MOMENT_STATUS.PUBLISHED })
    .populate("creator", "fullName")
    .populate("shop", "name slug")
    .sort({ createdAt: -1 });

export const incrementLikes = (id) =>
  Moment.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  );

export const incrementViews = (id) =>
  Moment.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  );

export const incrementShopClicks = (id) =>
  Moment.findByIdAndUpdate(
    id,
    { $inc: { shopClicks: 1 } },
    { new: true }
  );
