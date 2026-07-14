import * as repository from "./order.repository.js";
import * as cartRepository from "../carts/cart.repository.js";
import Cart from "../carts/cart.model.js";
import Product from "../products/product.model.js";
import * as notificationService from "../notifications/notification.service.js";
import { ORDER_STATUS, PAYMENT_STATUS } from "./order.constants.js";

/**
 * Generate Order Number
 * Example: MHI-20260714-483921
 */
function generateOrderNumber() {
  const random = Math.floor(100000 + Math.random() * 900000);

  const date = new Date();

  const formatted =
    date.getFullYear() +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0");

  return `MHI-${formatted}-${random}`;
}

/**
 * Create Order From Cart
 */
export async function createOrder(customerId, orderData) {
  const cart = await Cart.findOne({ customer: customerId })
    .populate("items.product")
    .populate("shop");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty.");
  }

  let orderNumber = generateOrderNumber();

  while (await repository.findByOrderNumber(orderNumber)) {
    orderNumber = generateOrderNumber();
  }

  const items = cart.items.map((item) => ({
    product: item.product._id,
    name: item.product.name || item.name,
    image:
      item.product.images?.[0] ||
      item.image ||
      "",
    price: item.price,
    quantity: item.quantity,
    total: item.total,
  }));

  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);

    if (!product) {
      throw new Error(`Product not found: ${item.product.name || item.product}`);
    }

    if (product.stock < item.quantity) {
      throw new Error(`Product out of stock: ${product.name}`);
    }

    product.stock -= item.quantity;
    await product.save();
  }

  const order = await repository.create({
    orderNumber,
    customer: customerId,
    shop: cart.shop._id,
    items,
    deliveryType: orderData.deliveryType,
    deliveryAddress: orderData.deliveryAddress,
    subTotal: cart.subTotal,
    tax: cart.tax,
    discount: cart.discount,
    deliveryCharge: cart.deliveryCharge,
    totalAmount: cart.grandTotal,
    paymentMethod: orderData.paymentMethod,
    paymentStatus: PAYMENT_STATUS.PENDING,
    orderStatus: ORDER_STATUS.PLACED,
    notes: orderData.notes || "",
  });

  await cartRepository.deleteCart(customerId);

  await notificationService.createNotification({
    user: cart.shop.owner,
    title: "New Order Received",
    message: `New order ${order.orderNumber} has been placed for your shop.`,
    type: "ORDER",
    referenceId: order._id,
  });

  return order;
}

export async function updateOrderStatus(id, status) {
  const order = await repository.update(id, { orderStatus: status });

  if (!order) {
    throw new Error("Order not found.");
  }

  if (status === ORDER_STATUS.ACCEPTED) {
    await notificationService.createNotification({
      user: order.customer,
      title: "Order Accepted",
      message: `Your order ${order.orderNumber} has been accepted by the shop.`,
      type: "ORDER",
      referenceId: order._id,
    });
  }

  return order;
}

/**
 * Get Order
 */
export const getOrder = (id) => repository.findById(id);

/**
 * Customer Orders
 */
export const getCustomerOrders = (customerId) =>
  repository.findByCustomer(customerId);

/**
 * Shop Orders
 */
export const getShopOrders = (shopId) => repository.findByShop(shopId);

/**
 * Update Order
 */
export const updateOrder = (id, data) => repository.update(id, data);

/**
 * Delete Order
 */
export const deleteOrder = (id) => repository.remove(id);
