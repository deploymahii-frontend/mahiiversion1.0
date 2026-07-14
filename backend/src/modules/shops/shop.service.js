import * as repository from "./shop.repository.js";
import {
  generateSlug,
  generateUniqueSlug,
} from "./shop.helpers.js";
import { buildShopFilter } from "./shop.search.js";

/**
 * Create a new shop
 */
export const createShop = async (shopData) => {
  let slug = generateSlug(shopData.name);

  let count = 0;

  while (await repository.findShopBySlug(generateUniqueSlug(slug, count))) {
    count++;
  }

  slug = generateUniqueSlug(slug, count);

  return repository.createShop({
    ...shopData,
    slug,
  });
};

/**
 * Get shop by ID
 */
export const getShopById = (id) => {
  return repository.findShopById(id);
};

/**
 * Get shop by slug
 */
export const getShopBySlug = async (slug) => {
  const shop = await repository.findShopBySlug(slug);

  if (shop) {
    await repository.updateShop(shop._id, {
      totalViews: (shop.totalViews || 0) + 1,
    });
  }

  return shop;
};

/**
 * Get owner's shop
 */
export const getOwnerShop = (ownerId) => {
  return repository.findShopByOwner(ownerId);
};

/**
 * Update shop
 */
export const updateShop = (id, data) => {
  return repository.updateShop(id, data);
};

/**
 * Delete shop
 */
export const deleteShop = (id) => {
  return repository.deleteShop(id);
};

/**
 * List shops
 */
export const listShops = (query, options) => {
  const filter = buildShopFilter(query);
  return repository.listShops(filter, options);
};

/**
 * Search shops
 */
export const searchShops = (search) => {
  return repository.searchShops(search);
};

/**
 * Get nearby shops
 */
export const getNearbyShops = async (query) => {
  const {
    longitude,
    latitude,
    maxDistance = 5000,
  } = query;

  if (!longitude || !latitude) {
    throw new Error("Longitude and latitude are required");
  }

  const filter = buildShopFilter(query);

  return repository.findNearby({
    longitude: Number(longitude),
    latitude: Number(latitude),
    maxDistance: Number(maxDistance),
    filter,
  });
};

