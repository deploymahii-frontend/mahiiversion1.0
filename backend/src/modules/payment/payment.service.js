import crypto from "crypto";
import Order from "../orders/order.model.js";
import * as paymentRepository from "./payment.repository.js";
import { PAYMENT_STATUS } from "../orders/order.constants.js";
import { razorpay } from "./payment.helpers.js";

/**
 * Create Razorpay Order
 */
export async function createOrder({ amount, receipt, orderId }) {
  const paymentOrder = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt,
  });

  await paymentRepository.create({
    order: orderId || null,
    gateway: "RAZORPAY",
    amount,
    currency: "INR",
    providerOrderId: paymentOrder.id,
    status: PAYMENT_STATUS.CREATED,
    metadata: { receipt },
  });

  return paymentOrder;
}

/**
 * Verify Razorpay Signature
 */
export async function verifyPayment({
  orderId,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) {
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const verified = expected === razorpay_signature;

  if (!orderId) {
    return { verified, order: null };
  }

  const order = await Order.findById(orderId);

  if (!order) {
    return { verified, order: null };
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    {
      paymentStatus: verified ? PAYMENT_STATUS.PAID : PAYMENT_STATUS.FAILED,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    },
    { new: true }
  );

  await paymentRepository.updateByProviderOrderId(razorpay_order_id, {
    order: orderId,
    providerPaymentId: razorpay_payment_id,
    providerSignature: razorpay_signature,
    status: verified ? PAYMENT_STATUS.VERIFIED : PAYMENT_STATUS.FAILED,
    metadata: {
      ...order.metadata,
      verifyPayload: {
        razorpay_order_id,
        razorpay_payment_id,
      },
    },
  });

  return { verified, order: updatedOrder };
}
