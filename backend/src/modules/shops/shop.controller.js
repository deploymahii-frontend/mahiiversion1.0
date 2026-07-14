import * as shopService from "./shop.service.js";

/**
 * Create Shop
 */
export const createShop = async (req, res, next) => {
  try {
    const shop = await shopService.createShop({
      ...req.body,
      owner: req.user._d,
    });

    return res.status(201).json({
      success: true,
      message: "Shop created successfully.",
      data: shop,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Shop By ID
 */
export const getShopById = async (req, res, next) => {
  try {
    const shop = await shopService.getShopById(req.params.id);

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found.",
      });
    }

    return res.json({
      success: true,
      data: shop,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Shop By Slug
 */
export const getShopBySlug = async (req, res, next) => {
  try {
    const shop = await shopService.getShopBySlug(req.params.slug);

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found.",
      });
    }

    return res.json({
      success: true,
      data: shop,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Shop
 */
export const updateShop = async (req, res, next) => {
  try {
    const shop = await shopService.updateShop(req.params.id, req.body);

    return res.json({
      success: true,
      message: "Shop updated successfully.",
      data: shop,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Shop
 */
export const deleteShop = async (req, res, next) => {
  try {
    await shopService.deleteShop(req.params.id);

    return res.json({
      success: true,
      message: "Shop deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * List Shops
 */
export const listShops = async (req, res, next) => {
  try {
    const shops = await shopService.listShops(req.query, req.query);

    return res.json({
      success: true,
      data: shops,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Search Shops
 */
export const searchShops = async (req, res, next) => {
  try {
    const shops = await shopService.searchShops(req.query.search || "");

    return res.json({
      success: true,
      data: shops,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Nearby Shops
 */
export const nearbyShops = async (req, res, next) => {
  try {
    const shops = await shopService.getNearbyShops(req.query);

    res.json({
      success: true,
      count: shops.length,
      data: shops,
    });
  } catch (error) {
    next(error);
  }
};

