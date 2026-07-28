import client from "./client.js";

export const shopApi = {
  getAllShops: (params) => client.get("/businesses", { params }),
  getShop: (slug) => client.get(`/businesses/slug/${slug}`),
  getShopById: (id) => client.get(`/businesses/${id}`),
  getShopBySlug: (slug) => client.get(`/businesses/slug/${slug}`),
  createShop: (data) => client.post("/businesses", data),
  updateShop: (id, data) => client.put(`/businesses/${id}`, data),
  deleteShop: (id) => client.delete(`/businesses/${id}`),
  getNearbyShops: (params) => client.get("/businesses/nearby", { params }),
  getNearby: (params) => client.get("/businesses/nearby", { params }),
};

export default shopApi;
