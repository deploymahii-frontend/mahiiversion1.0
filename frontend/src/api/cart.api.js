import API from "./api";

const cartAPI = {
  getCart() {
    return API.get("/cart");
  },

  addItem(data) {
    return API.post("/cart/add", data);
  },

  updateQuantity(productId, quantity) {
    return API.patch(`/cart/item/${productId}`, { quantity });
  },

  removeItem(productId) {
    return API.delete(`/cart/item/${productId}`);
  },

  clearCart() {
    return API.delete("/cart");
  },
};

export default cartAPI;
