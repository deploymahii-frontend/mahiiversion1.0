import * as repository from "./recommendation.repository.js";
import * as shopRepository from "../shops/shop.repository.js";

/**
 * Trending Shops
 */
export const getTrending = () => {
  return repository.getTrendingShops(10);
};

/**
 * Featured Shops
 */
export const getFeatured = () => {
  return repository.getFeaturedShops(10);
};

/**
 * Similar Shops
 */
export const getSimilar = async (shopId) => {
  const shop = await shopRepository.findShopById(shopId);

  if (!shop) {
    throw new Error("Shop not found.");
  }

  return repository.getSimilarShops(shop, 8);
};
