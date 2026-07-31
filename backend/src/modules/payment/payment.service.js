import Payment from "./payment.model.js";

export const createPayment = async ({ order, customer, amount, method }) => {
  return Payment.create({
    order,
    customer,
    amount,
    method,
  });
};
