import Shop from "./shop.model.js";

export const createShop = (shopData) => {
  return Shop.create(shopData);
};

export const findShopById = (shopId) => {
  return Shop.findById(shopId);
};

export const findShopBySlug = (slug) => {
  return Shop.findOne({ slug });
};

export const findShopByOwner = (ownerId) => {
  return Shop.findOne({ owner: ownerId });
};

export const updateShop = (shopId, updateData) => {
  return Shop.findByIdAndUpdate(shopId, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteShop = (shopId) => {
  return Shop.findByIdAndDelete(shopId);
};

export const listShops = (filter = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
  } = options;

  return Shop.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);
};

export const countShops = (filter = {}) => {
  return Shop.countDocuments(filter);
};

export const searchShops = (search) => {
  const regex = { $regex: search, $options: "i" };

  return Shop.find({
    $or: [
      { name: regex },
      { description: regex },
      { tags: regex },
      { searchKeywords: regex },
    ],
  });
};

export function findNearby({
  longitude,
  latitude,
  maxDistance = 5000,
  filter = {},
}) {
  return Shop.find({
    ...filter,
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: maxDistance,
      },
    },
  });
}

export const findNearbyShops = (longitude, latitude, maxDistance = 5000) => {
  return findNearby({ longitude, latitude, maxDistance });
};
