import * as repository from "./order.repository.js";
import * as cartRepository from "../carts/cart.repository.js";
import Cart from "../carts/cart.model.js";
import Product from "../products/product.model.js";
import * as notificationService from "../notifications/notification.service.js";
import { ORDER_STATUS, PAYMENT_STATUS, ALLOWED_TRANSITIONS, PAYMENT_METHOD } from "./order.constants.js";
import mongoose from "mongoose";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_mock_key",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_test_mock_secret",
});

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
    const session = await mongoose.startSession();

    try {
        let createdOrder = null;
        let shopOwnerId = null;

        await session.withTransaction(async () => {
            const cart = await Cart.findOne({
                customer: customerId,
            })
            .populate("items.product")
            .populate("shop")
            .session(session);

            if (!cart || cart.items.length === 0) {
                throw new Error("Cart is empty.");
            }

            shopOwnerId = cart.shop.owner;

            let orderNumber = generateOrderNumber();

            while (await repository.findByOrderNumber(orderNumber, session)) {
                orderNumber = generateOrderNumber();
            }

            const items = cart.items.map((item) => ({
                product: item.product._id,
                name: item.product.name || item.name,
                image: item.product.images?.[0] || item.image || "",
                price: item.price,
                quantity: item.quantity,
                total: item.total,
            }));

            for (const item of cart.items) {
                const itemPid = item.product._id || item.product;
                const updatedProduct = await Product.findOneAndUpdate(
                    {
                        _id: itemPid,
                    },
                    {
                        $inc: {
                            stock: -item.quantity,
                            "inventory.quantity": -item.quantity,
                        },
                    },
                    {
                        new: true,
                        session,
                    }
                );

                if (!updatedProduct) {
                    throw new Error(
                        `${item.name || item.product?.name || "Item"} is out of stock.`
                    );
                }
            }

            createdOrder = await repository.create(
                {
                    orderNumber,
                    customer: customerId,
                    shop: cart.shop._id,
                    items,
                    deliveryType: orderData.deliveryType,
                    deliveryAddress: orderData.deliveryAddress,
                    subTotal: cart.subTotal,
                    tax: cart.tax,
                    discount: cart.discount,
                    couponCode: cart.couponCode || "",
                    couponId: cart.couponId || null,
                    deliveryCharge: cart.deliveryCharge,
                    totalAmount: cart.grandTotal,
                    paymentMethod: orderData.paymentMethod,
                    paymentStatus: PAYMENT_STATUS.PENDING,
                    orderStatus: ORDER_STATUS.PLACED,
                    notes: orderData.notes || "",
                },
                session
            );

            // Integrate Razorpay
            if (orderData.paymentMethod === PAYMENT_METHOD.RAZORPAY) {
                const razorpayOrder = await razorpayInstance.orders.create({
                    amount: Math.round(cart.grandTotal * 100), // amount in smallest currency unit (paise)
                    currency: "INR",
                    receipt: createdOrder.orderNumber,
                });
                
                createdOrder.razorpayOrderId = razorpayOrder.id;
                await createdOrder.save({ session });
            }

            await cartRepository.deleteCart(
                customerId,
                session
            );
        });

        if (createdOrder) {
            try {
                await notificationService.createNotification({
                    recipient: shopOwnerId,
                    title: "New Order Received 🛒",
                    message: `New order ${createdOrder.orderNumber} has been placed for your shop.`,
                    type: "ORDER",
                    data: { orderId: createdOrder._id },
                });
            } catch (err) {
                console.error("Notification failed (non-fatal):", err.message);
            }
        }

        return createdOrder;

    } finally {
        await session.endSession();
    }
}

export async function updateOrderStatus(id, status) {
  const order = await repository.findById(id);

  if (!order) {
    throw new Error("Order not found.");
  }

  const validNextStatuses = ALLOWED_TRANSITIONS[order.orderStatus] || [];
  if (!validNextStatuses.includes(status)) {
    throw new Error(`Invalid status transition from ${order.orderStatus} to ${status}.`);
  }

  if (status === ORDER_STATUS.CANCELLED) {
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        for (const item of order.items) {
          await Product.findByIdAndUpdate(
            item.product,
            { $inc: { stock: item.quantity, "inventory.quantity": item.quantity } },
            { session }
          );
        }
        await repository.update(id, { orderStatus: status }, session);
      });
    } finally {
      session.endSession();
    }
  } else {
    await repository.update(id, { orderStatus: status });
  }

  const updatedOrder = await repository.findById(id);
  const customerId = order.customer?._id || order.customer;

  // Send customer notification based on status
  const notificationMap = {
    [ORDER_STATUS.ACCEPTED]: {
      title: "Order Accepted ✅",
      message: `Your order ${order.orderNumber} has been accepted by the shop and is being prepared.`,
    },
    [ORDER_STATUS.PREPARING]: {
      title: "Order is Being Prepared 👨‍🍳",
      message: `Great news! Your order ${order.orderNumber} is being prepared.`,
    },
    [ORDER_STATUS.OUT_FOR_DELIVERY]: {
      title: "Out for Delivery 🚴",
      message: `Your order ${order.orderNumber} is out for delivery and will reach you soon!`,
    },
    [ORDER_STATUS.DELIVERED]: {
      title: "Order Delivered 🎉",
      message: `Your order ${order.orderNumber} has been delivered. Enjoy your order!`,
    },
    [ORDER_STATUS.CANCELLED]: {
      title: "Order Cancelled",
      message: `Your order ${order.orderNumber} has been cancelled.`,
    },
  };

  if (notificationMap[status] && customerId) {
    try {
      await notificationService.createNotification({
        recipient: customerId,
        type: "ORDER",
        ...notificationMap[status],
        data: { orderId: order._id },
      });
    } catch (err) {
      console.error("Notification failed (non-fatal):", err.message);
    }
  }

  return updatedOrder;
}

export async function verifyPayment(id, paymentData) {
  const order = await repository.findById(id);
  if (!order) {
    throw new Error("Order not found.");
  }

  if (order.paymentStatus === PAYMENT_STATUS.PAID) {
    throw new Error("Payment is already verified and marked as PAID.");
  }

  if (paymentData.razorpayOrderId && order.razorpayOrderId && order.razorpayOrderId !== paymentData.razorpayOrderId) {
    throw new Error("Payment does not belong to this order.");
  }

  if (paymentData.amount && paymentData.amount !== order.totalAmount * 100) {
    throw new Error("Payment amount does not match the order total.");
  }

  // Cryptographic Signature Verification
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "rzp_test_mock_secret")
    .update(order.razorpayOrderId + "|" + paymentData.razorpayPaymentId)
    .digest("hex");

  if (generatedSignature !== paymentData.razorpaySignature) {
    throw new Error("Invalid payment signature.");
  }

  const updatedOrder = await repository.update(id, {
    paymentStatus: PAYMENT_STATUS.PAID,
    razorpayPaymentId: paymentData.razorpayPaymentId || order.razorpayPaymentId,
    razorpaySignature: paymentData.razorpaySignature || order.razorpaySignature,
  });

  return updatedOrder;
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
