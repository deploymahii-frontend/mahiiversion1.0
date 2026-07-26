import api from "@/services/api";

export const homeApi = {
  getHome() {
    return api.get("/home");
  },

  getCategories() {
    return api.get("/categories");
  },

  getNearbyBusinesses(params) {
    return api.get("/shops/nearby", {
      params,
    });
  },

  getTrendingProducts() {
    // backend exposes product listing; request a small page for "trending" view
    return api.get("/products", { params: { limit: 9 } });
  },

  getOffers() {
    return api.get("/offers");
  },
};
