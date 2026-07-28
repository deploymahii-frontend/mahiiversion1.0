import mongoose from "mongoose";

const paymentTransactionSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
      index: true,
    },
    gateway: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
      default: "INR",
    },
    providerOrderId: {
      type: String,
      default: "",
      index: true,
    },
    providerPaymentId: {
      type: String,
      default: "",
    },
    providerSignature: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);



const PaymentTransaction = mongoose.model(
  "PaymentTransaction",
  paymentTransactionSchema
);

export const create = (data) => PaymentTransaction.create(data);

export const updateByProviderOrderId = (providerOrderId, data) =>
  PaymentTransaction.findOneAndUpdate(
    { providerOrderId },
    data,
    { new: true }
  );

export const findByOrderId = (orderId) =>
  PaymentTransaction.findOne({ order: orderId });
