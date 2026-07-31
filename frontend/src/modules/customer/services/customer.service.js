import api from "@/services/api";

export const customerService = {
  getDashboard() {
    return api.get("/customer/dashboard");
  },

  getRecommendedShops() {
    return api.get("/shops/recommended");
  },

  getNearbyShops(location) {
    return api.get("/shops/nearby", {
      params: location,
    });
  },

  getOffers() {
    return api.get("/offers");
  },

  getRecentOrders() {
    return api.get("/orders/recent");
  },

  getWallet() {
    return api.get("/wallet");
  },

  getCategories() {
    return api.get("/categories");
  },
};
