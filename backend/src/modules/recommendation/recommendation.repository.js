import Shop from "../shops/shop.model.js";

export const getTrendingShops = async (limit = 10) => {
  return Shop.find({
    isActive: true,
    status: "published",
  })
    .sort({
      rating: -1,
      totalReviews: -1,
      totalViews: -1,
    })
    .limit(limit);
};

export const getFeaturedShops = async (limit = 10) => {
  return Shop.find({
    isActive: true,
    isFeatured: true,
  })
    .sort({
      rating: -1,
      totalReviews: -1,
    })
    .limit(limit);
};

export const getSimilarShops = async (shop, limit = 8) => {
  return Shop.find({
    _id: { $ne: shop._id },
    category: shop.category,
    isActive: true,
  })
    .sort({
      rating: -1,
      totalReviews: -1,
    })
    .limit(limit);
};
