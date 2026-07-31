import api from "@/services/api";

const ordersService = {
  // GET all customer orders (with optional filters)
  getOrders(params = {}) {
    return api.get("/customer/orders", { params });
  },

  // GET single order details
  getOrder(id) {
    return api.get(`/customer/orders/${id}`);
  },

  // GET live tracking data
  trackOrder(id) {
    return api.get(`/customer/orders/${id}/track`);
  },

  // POST reorder from previous order
  reorder(id) {
    return api.post(`/customer/orders/${id}/reorder`);
  },

  // PATCH cancel order
  cancelOrder(id, reason) {
    return api.patch(`/customer/orders/${id}/cancel`, { reason });
  },

  // GET invoice download URL
  getInvoice(id) {
    return api.get(`/customer/orders/${id}/invoice`);
  },
};

export default ordersService;
