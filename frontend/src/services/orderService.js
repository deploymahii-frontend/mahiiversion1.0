import ApiClient from "../core/api/ApiClient";

export async function createOrder(order) {
  const { data } = await ApiClient.post("/orders", order);

  return data.data;
}

export async function getMyOrders() {
  const { data } = await ApiClient.get("/orders");

  return data.data;
}

export async function getOrder(id) {
  const { data } = await ApiClient.get(`/orders/${id}`);

  return data.data;
}

export async function verifyPayment(id, paymentData) {
  const { data } = await ApiClient.post(`/orders/${id}/verify-payment`, paymentData);
  return data.data;
}
