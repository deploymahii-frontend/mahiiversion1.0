import client from "./client.js";

export const paymentApi = {
  createRazorpayOrder: (data) => client.post("/payments/create-order", data),
  verifyPayment: (data) => client.post("/payments/verify", data),
};
