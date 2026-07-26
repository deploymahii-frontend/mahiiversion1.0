import * as cartService from "./cart.service.js";

export async function getCart(req, res, next) {
  try {
    const cart = await cartService.getCart(req.user._id);

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
}

export async function addItem(req, res, next) {
  try {
    const cart = await cartService.addItem(
      req.user._id,
      req.body
    );

    res.status(201).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateQuantity(req, res, next) {
  try {
    const cart = await cartService.updateQuantity(
      req.user._id,
      req.params.productId,
      req.body.quantity
    );

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeItem(req, res, next) {
  try {
    const cart = await cartService.removeItem(
      req.user._id,
      req.params.productId
    );

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
}

export async function clearCart(req, res, next) {
  try {
    await cartService.clearCart(req.user._id);

    res.json({
      success: true,
      message: "Cart cleared successfully.",
    });
  } catch (error) {
    next(error);
  }
}
