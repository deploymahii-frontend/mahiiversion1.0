import API from "./api";

const productAPI = {
  getProducts(params) {
    return API.get("/products", { params });
  },

  getShopProducts(shopId) {
    return API.get(`/products/shop/${shopId}`);
  },

  getProduct(id) {
    return API.get(`/products/${id}`);
  },

  createProduct(data) {
    return API.post("/products", data);
  },

  updateProduct(id, data) {
    return API.put(`/products/${id}`, data);
  },

  deleteProduct(id) {
    return API.delete(`/products/${id}`);
  },

  searchProducts(params) {
    return API.get("/products/search", { params });
  },
};

export default productAPI;
