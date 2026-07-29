import * as wishlistService from "./wishlist.service.js";

export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await wishlistService.getWishlist(req.user._id);

    return res.json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

export const addWishlistItem = async (req, res, next) => {
  try {
    const wishlistItem = await wishlistService.addToWishlist(
      req.user._id,
      req.params.shopId
    );

    return res.status(201).json({
      success: true,
      message: "Shop added to wishlist.",
      data: wishlistItem,
    });
  } catch (error) {
    next(error);
  }
};

export const removeWishlistItem = async (req, res, next) => {
  try {
    await wishlistService.removeFromWishlist(req.user._id, req.params.shopId);

    return res.json({
      success: true,
      message: "Shop removed from wishlist.",
    });
  } catch (error) {
    next(error);
  }
};
