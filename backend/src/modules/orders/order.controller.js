import * as orderService from "./order.service.js";
import { successResponse, errorResponse } from "../../utils/api-response.js";

/**
 * Create Order
 */
export async function createOrder(req, res, next) {
  try {
    const order = await orderService.createOrder(req.user._id, req.body);

    return successResponse(
      res,
      order,
      "Order placed successfully",
      201
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Customer Orders
 */
export async function getMyOrders(req, res, next) {
  try {
    const orders = await orderService.getCustomerOrders(req.user._id);

    return successResponse(res, orders, "Orders fetched successfully");
  } catch (error) {
    next(error);
  }
}

/**
 * Shop Orders
 */
export async function getShopOrders(req, res, next) {
  try {
    const orders = await orderService.getShopOrders(req.params.shopId);

    return successResponse(res, orders, "Orders fetched successfully");
  } catch (error) {
    next(error);
  }
}

/**
 * Get Order
 */
export async function getOrder(req, res, next) {
  try {
    const order = await orderService.getOrder(req.params.id);

    if (!order) {
      return errorResponse(res, "Order not found", 404);
    }

    return successResponse(res, order, "Order fetched successfully");
  } catch (error) {
    next(error);
  }
}

/**
 * Update Order
 */
export async function updateOrder(req, res, next) {
  try {
    const order = await orderService.updateOrder(req.params.id, req.body);

    return successResponse(
      res,
      order,
      "Order updated successfully"
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Update Order Status
 */
export async function updateOrderStatus(req, res, next) {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status
    );

    return successResponse(
      res,
      order,
      "Order status updated successfully"
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Delete Order
 */
export async function deleteOrder(req, res, next) {
  try {
    await orderService.deleteOrder(req.params.id);

    return successResponse(
      res,
      null,
      "Order deleted successfully"
    );
  } catch (error) {
    next(error);
  }
}
