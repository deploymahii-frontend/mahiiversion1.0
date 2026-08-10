import * as service from "./product.service.js";
import shopOwnerService from "../shopOwner/shopOwner.service.js";

function getUserRole(req) {
  return String(req.user?.role?.name || req.user?.role || "").toUpperCase();
}

export async function create(req, res, next) {
  try {
    const product = await shopOwnerService.createProduct(req.user._id, req.body);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

export async function list(req, res, next) {
  try {
    const shopId = req.params.shopId || req.query.shopId;
    const isShopOwnerRequest =
      req.user &&
      getUserRole(req) === "SHOP_OWNER" &&
      !req.params.shopId &&
      !req.query.search &&
      !req.query.category;

    if (isShopOwnerRequest) {
      const products = await shopOwnerService.getProducts(req.user._id);
      return res.json({
        success: true,
        data: products,
      });
    }

    if (shopId) {
      const products = await service.getShopProducts(shopId);
      return res.json({
        success: true,
        data: products,
      });
    }

    const result = await service.getAllProducts(req.query);
    return res.json({
      success: true,
      data: result.products || result,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    });
  } catch (error) {
    next(error);
  }
}

export async function getOne(req, res, next) {
  try {
    const idOrSlug = req.params.id;
    let product;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      product = await service.getProduct(idOrSlug);
    } else {
      product = await service.getProductBySlug(idOrSlug);
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    const product = await shopOwnerService.updateProduct(req.user._id, req.params.id, req.body);

    return res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateStock(req, res, next) {
  try {
    const { stock, quantity } = req.body;
    const qty = stock !== undefined ? stock : quantity;
    const product = await shopOwnerService.updateStock(req.user._id, req.params.id, qty);

    return res.json({
      success: true,
      message: "Stock updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

export async function toggleAvailability(req, res, next) {
  try {
    const product = await service.getProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const newAvailability = req.body.available !== undefined ? req.body.available : !product.available;
    const updated = await shopOwnerService.toggleAvailability(
      req.user._id,
      req.params.id,
      newAvailability
    );

    return res.json({
      success: true,
      message: `Product availability set to ${newAvailability}`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    await shopOwnerService.deleteProduct(req.user._id, req.params.id);

    return res.json({
      success: true,
      message: "Product archived successfully",
    });
  } catch (error) {
    next(error);
  }
}
