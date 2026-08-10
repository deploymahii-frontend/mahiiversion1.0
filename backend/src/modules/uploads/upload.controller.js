import path from "path";
import User from "../users/user.model.js";
import Shop from "../shops/shop.model.js";
import Product from "../products/product.model.js";
import Moment from "../moments/moment.model.js";
import Promotion from "../promotions/promotion.model.js";
import { successResponse, errorResponse } from "../../utils/api-response.js";

const getFileUrl = (req, file) => {
  if (!file) return "";
  if (file.secure_url || file.url) {
    return file.secure_url || file.url;
  }
  if (file.filename) {
    return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
  }
  if (file.path) {
    const filename = path.basename(file.path);
    return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
  }
  return "";
};

const requireFile = (req, file) => {
  const url = getFileUrl(req, file);
  if (!url) {
    const error = new Error("Uploaded file is missing or invalid.");
    error.statusCode = 400;
    throw error;
  }
  return url;
};

export function uploadImage(req, res, next) {
  try {
    const url = requireFile(req, req.file);
    return successResponse(res, { url }, "Image uploaded successfully.");
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode || 500);
  }
}

export function uploadImages(req, res, next) {
  try {
    const urls = (req.files || []).map(file => requireFile(req, file));
    return successResponse(res, { urls }, "Images uploaded successfully.");
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode || 500);
  }
}

export function uploadVideo(req, res, next) {
  try {
    const url = requireFile(req, req.file);
    return successResponse(res, { url }, "Video uploaded successfully.");
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode || 500);
  }
}

export async function updateUserProfileImage(req, res, next) {
  try {
    const url = requireFile(req, req.file);
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: url },
      { new: true, runValidators: true }
    );

    if (!user) {
      return errorResponse(res, "User not found.", 404);
    }

    return successResponse(res, { url }, "Profile image updated successfully.");
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode || 500);
  }
}

export async function updateShopLogo(req, res, next) {
  try {
    const url = requireFile(req, req.file);
    const shop = await Shop.findById(req.params.shopId);

    if (!shop) {
      return errorResponse(res, "Shop not found.", 404);
    }

    if (shop.owner.toString() !== req.user._id.toString() && req.user.role !== "ADMIN") {
      return errorResponse(res, "Permission denied.", 403);
    }

    shop.logo = url;
    await shop.save();

    return successResponse(res, { url }, "Shop logo updated successfully.");
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode || 500);
  }
}

export async function updateShopCover(req, res, next) {
  try {
    const url = requireFile(req, req.file);
    const shop = await Shop.findById(req.params.shopId);

    if (!shop) {
      return errorResponse(res, "Shop not found.", 404);
    }

    if (shop.owner.toString() !== req.user._id.toString() && req.user.role !== "ADMIN") {
      return errorResponse(res, "Permission denied.", 403);
    }

    shop.cover = url;
    await shop.save();

    return successResponse(res, { url }, "Shop cover updated successfully.");
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode || 500);
  }
}

export async function updateProductImages(req, res, next) {
  try {
    const urls = (req.files || []).map(file => requireFile(req, file));
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return errorResponse(res, "Product not found.", 404);
    }

    const shop = await Shop.findById(product.shop);
    if (!shop) {
      return errorResponse(res, "Product shop not found.", 404);
    }

    if (shop.owner.toString() !== req.user._id.toString() && req.user.role !== "ADMIN") {
      return errorResponse(res, "Permission denied.", 403);
    }

    product.images = [...(product.images || []), ...urls];
    await product.save();

    return successResponse(res, { urls }, "Product images uploaded successfully.");
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode || 500);
  }
}

export async function updateMomentThumbnail(req, res, next) {
  try {
    const url = requireFile(req, req.file);
    const moment = await Moment.findById(req.params.momentId);

    if (!moment) {
      return errorResponse(res, "Moment not found.", 404);
    }

    if (moment.creator.toString() !== req.user._id.toString() && req.user.role !== "ADMIN") {
      return errorResponse(res, "Permission denied.", 403);
    }

    moment.thumbnailUrl = url;
    await moment.save();

    return successResponse(res, { url }, "Moment thumbnail updated successfully.");
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode || 500);
  }
}

export async function updateMomentVideo(req, res, next) {
  try {
    const url = requireFile(req, req.file);
    const moment = await Moment.findById(req.params.momentId);

    if (!moment) {
      return errorResponse(res, "Moment not found.", 404);
    }

    if (moment.creator.toString() !== req.user._id.toString() && req.user.role !== "ADMIN") {
      return errorResponse(res, "Permission denied.", 403);
    }

    moment.videoUrl = url;
    await moment.save();

    return successResponse(res, { url }, "Moment video updated successfully.");
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode || 500);
  }
}

export async function updatePromotionVideo(req, res, next) {
  try {
    const url = requireFile(req, req.file);
    const promotion = await Promotion.findById(req.params.promotionId);

    if (!promotion) {
      return errorResponse(res, "Promotion not found.", 404);
    }

    if (promotion.createdBy.toString() !== req.user._id.toString() && req.user.role !== "ADMIN") {
      return errorResponse(res, "Permission denied.", 403);
    }

    promotion.videoUrl = url;
    await promotion.save();

    return successResponse(res, { url }, "Promotion video updated successfully.");
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode || 500);
  }
}
