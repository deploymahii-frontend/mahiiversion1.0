import * as cartService from "./cart.service.js";
import { successResponse } from "../../utils/api-response.js";

/**
 * Get Customer Cart
 */
export async function getCart(req, res, next) {
  try {
    const cart = await cartService.getCart(req.user._id);

    return successResponse(res, cart, "Cart fetched successfully");
  } catch (error) {
    next(error);
  }
}

/**
 * Add Product To Cart
 */
export async function addToCart(req, res, next) {
  try {
    const { productId, quantity } = req.body;

    const cart = await cartService.addToCart(
      req.user._id,
      productId,
      Number(quantity) || 1
    );

    return successResponse(
      res,
      cart,
      "Product added to cart",
      201
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Update Quantity
 */
export async function updateQuantity(req, res, next) {
  try {
    const { quantity } = req.body;

    const cart = await cartService.updateQuantity(
      req.user._id,
      req.params.productId,
      Number(quantity)
    );

    return successResponse(
      res,
      cart,
      "Cart updated successfully"
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Remove Product
 */
export async function removeFromCart(req, res, next) {
  try {
    const cart = await cartService.removeFromCart(
      req.user._id,
      req.params.productId
    );

    return successResponse(
      res,
      cart,
      "Product removed from cart"
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Clear Cart
 */
export async function clearCart(req, res, next) {
  try {
    await cartService.clearCart(req.user._id);

    return successResponse(
      res,
      null,
      "Cart cleared successfully"
    );
  } catch (error) {
    next(error);
  }
}
