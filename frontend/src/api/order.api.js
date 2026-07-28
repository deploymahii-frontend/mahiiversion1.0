import client from "./client.js";

export const orderApi = {
  createOrder: (data) => client.post("/orders", data),
  getOrderById: (id) => client.get(`/orders/${id}`),
  getCustomerOrders: (params) => client.get("/orders/customer", { params }),
  getShopOrders: (shopId, params) => client.get(`/orders/shop/${shopId}`, { params }),
  updateOrderStatus: (id, data) => client.put(`/orders/${id}/status`, data),
  cancelOrder: (id) => client.put(`/orders/${id}/cancel`),
};
