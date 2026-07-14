import * as service from "./product.service.js";
import { successResponse } from "../../utils/api-response.js";

/**
 * Create Product
 */
export async function createProduct(req, res, next) {
  try {
    const product = await service.createProduct(req.body);

    return successResponse(
      res,
      product,
      "Product created successfully",
      201
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Get All Products
 */
export async function getProducts(req, res, next) {
  try {
    const { page, limit, ...filter } = req.query;

    const products = await service.getAllProducts(filter, {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
    });

    const total = await service.countProducts(filter);

    return successResponse(res, products, "Products fetched successfully");
  } catch (error) {
    next(error);
  }
}

/**
 * Get Product By ID
 */
export async function getProduct(req, res, next) {
  try {
    const product = await service.getProduct(req.params.id);

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

/**
 * Get Product By Slug
 */
export async function getProductBySlug(req, res, next) {
  try {
    const product = await service.getProductBySlug(req.params.slug);

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

/**
 * Get Products By Shop
 */
export async function getShopProducts(req, res, next) {
  try {
    const products = await service.getShopProducts(req.params.shopId);

    return res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Search Products
 */
export async function searchProducts(req, res, next) {
  try {
    const keyword = req.query.search || "";

    const products = await service.searchProducts(keyword);

    return res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Update Product
 */
export async function updateProduct(req, res, next) {
  try {
    const product = await service.updateProduct(req.params.id, req.body);

    return successResponse(
      res,
      product,
      "Product updated successfully"
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Delete Product
 */
export async function deleteProduct(req, res, next) {
  try {
    await service.deleteProduct(req.params.id);

    return successResponse(
      res,
      null,
      "Product deleted successfully"
    );
  } catch (error) {
    next(error);
  }
}
