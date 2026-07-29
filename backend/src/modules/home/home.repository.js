import Shop from "../shops/shop.model.js";
import Offer from "../offers/offer.model.js";
import Moment from "../moments/moment.model.js";

export const getFeaturedShops = () =>
  Shop.find({ isFeatured: true, isActive: true }).limit(8);

export const getTrendingShops = () =>
  Shop.find({ isActive: true })
    .sort({ rating: -1, totalReviews: -1 })
    .limit(8);

export const getLatestMoments = () =>
  Moment.find()
    .sort({ createdAt: -1 })
    .limit(8);

export const getActiveOffers = () =>
  Offer.find({
    isActive: true,
    status: "active",
  }).limit(8);
