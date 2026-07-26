import api from "../../../core/api";

export async function getCustomerOrders() {
  const { data } = await api.get("/orders/my-orders");
  return data.data;
}

export async function getOrder(id) {
  const { data } = await api.get(`/orders/${id}`);
  return data.data;
}
