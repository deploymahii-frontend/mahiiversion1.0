import client from "./client.js";

export const productApi = {
  getAllProducts: (params) => client.get("/catalog", { params }),
  getProductById: (id) => client.get(`/catalog/${id}`),
  getProductsByShop: (shopId, params) => client.get(`/catalog/shop/${shopId}`, { params }),
  createProduct: (data) => client.post("/catalog", data),
  updateProduct: (id, data) => client.put(`/catalog/${id}`, data),
  deleteProduct: (id) => client.delete(`/catalog/${id}`),
};
