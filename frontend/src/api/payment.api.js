import api from "./axios";

export const createPaymentOrder = async (data) => {
  const response = await api.post("/payment/create-order", data);
  return response.data.data;
};

export const verifyPayment = async (data) => {
  const response = await api.post("/payment/verify", data);
  return response.data;
};
