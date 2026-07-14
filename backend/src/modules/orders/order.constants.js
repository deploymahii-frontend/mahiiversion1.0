export const ORDER_STATUS = Object.freeze({
  PLACED: "PLACED",
  ACCEPTED: "ACCEPTED",
  PREPARING: "PREPARING",
  READY: "READY",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
});

export const PAYMENT_METHOD = Object.freeze({
  CASH: "CASH",
  UPI_DIRECT: "UPI_DIRECT",
  RAZORPAY: "RAZORPAY",
});

export const PAYMENT_STATUS = Object.freeze({
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
});
