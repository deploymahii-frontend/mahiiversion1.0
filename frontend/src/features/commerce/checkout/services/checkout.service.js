import api from "../../../core/api";

/**
 * Create Order
 */
export async function createOrder(payload) {
  const { data } = await api.post("/orders", payload);
  return data.data;
}

/**
 * Get Order
 */
export async function getOrder(orderId) {
  const { data } = await api.get(`/orders/${orderId}`);
  return data.data;
}

/**
 * Customer Orders
 */
export async function getCustomerOrders() {
  const { data } = await api.get("/orders/my-orders");
  return data.data;
}
