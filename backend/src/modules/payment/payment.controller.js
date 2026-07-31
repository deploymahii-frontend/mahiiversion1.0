import Payment from "./payment.model.js";
import Order from "../orders/order.model.js";
import phonepeProvider from "./providers/phonepe.provider.js";
import { createPayment } from "./payment.service.js";
import { createNotification } from "../notifications/notification.service.js";

export const createPaymentHandler = async (req, res) => {
  try {
    const { orderId, method } = req.body;

    const order = await Order.findById(orderId).populate("shop");
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const payment = await createPayment({
      order: order._id,
      customer: req.user._id,
      amount: order.totalAmount,
      method,
    });

    const txn = await phonepeProvider.createTransaction({
      amount: payment.amount,
      orderId: order._id,
      customerId: req.user._id,
    });

    payment.providerTransactionId = txn.transactionId;
    await payment.save();

    res.json({
      success: true,
      data: {
        payment,
        paymentUrl: txn.paymentUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPaymentHandler = async (req, res) => {
  try {
    const { paymentId } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    const verification = await phonepeProvider.verifyTransaction(payment.providerTransactionId);

    if (verification.success && verification.status === "SUCCESS") {
      payment.status = "SUCCESS";
      await payment.save();

      const order = await Order.findById(payment.order).populate("shop");
      if (order) {
        order.paymentStatus = "PAID";
        order.payment = payment._id;
        await order.save();

        await createNotification({
          recipient: order.shop.owner, // assuming shop has owner field
          type: "PAYMENT",
          title: "Payment Received",
          message: `Payment completed successfully for order ${order.orderNumber}.`,
          data: { orderId: order._id },
        });
      }

      res.json({ success: true, data: payment });
    } else {
      payment.status = "FAILED";
      await payment.save();

      const order = await Order.findById(payment.order);
      if (order) {
        order.paymentStatus = "FAILED";
        order.payment = payment._id;
        await order.save();
      }
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId);
    res.json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
