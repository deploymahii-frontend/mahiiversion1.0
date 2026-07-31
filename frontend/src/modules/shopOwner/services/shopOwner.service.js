import api from "@/services/api";

/*
|--------------------------------------------------------------------------
| Mahii Shop Owner API Service
| Base: /api/v1/shop
|--------------------------------------------------------------------------
*/
const shopOwnerService = {
  // Dashboard
  getDashboard: () => api.get("/shop/dashboard"),

  // Shop Profile
  registerShop: (data) => api.post("/shops", data),
  getProfile:   () => api.get("/shop/profile"),
  updateProfile: (data) => api.put("/shop/profile", data),
  toggleStatus:  (isOpen) => api.patch("/shop/status", { isOpen }),

  // Orders
  getOrders:         (params = {}) => api.get("/shop/orders", { params }),
  updateOrderStatus: (orderId, status) => api.patch(`/shop/orders/${orderId}/status`, { status }),

  // Products
  getProducts:          () => api.get("/shop/products"),
  createProduct:        (data) => api.post("/shop/products", data),
  updateProduct:        (productId, data) => api.put(`/shop/products/${productId}`, data),
  deleteProduct:        (productId) => api.delete(`/shop/products/${productId}`),
  updateStock:          (productId, quantity) => api.patch(`/shop/products/${productId}/stock`, { quantity }),
  toggleAvailability:   (productId, available) => api.patch(`/shop/products/${productId}/availability`, { available }),

  // Analytics
  getAnalytics: (days = 30) => api.get("/shop/analytics", { params: { days } }),

  // Reviews
  getReviews:     () => api.get("/shop/reviews"),
  replyToReview:  (reviewId, reply) => api.patch(`/shop/reviews/${reviewId}/reply`, { reply }),
};

export default shopOwnerService;
