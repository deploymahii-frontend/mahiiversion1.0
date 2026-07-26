export const smsTemplates = {
  ORDER_CONFIRMED: ({ orderId }) =>
    `Mahii: Your order ${orderId} has been confirmed.`,

  DELIVERY_OTP: ({ otp }) =>
    `Mahii Delivery OTP: ${otp}`,

  PAYMENT_SUCCESS: ({ amount }) =>
    `Payment of ₹${amount} received successfully.`,
};
