import client from "./client.js";

export const cartApi = {
  getCart: () => client.get("/cart"),
  addToCart: (data) => client.post("/cart/add", data),
  updateCartItem: (data) => client.put("/cart/update", data),
  removeFromCart: (data) => client.delete("/cart/remove", { data }),
  clearCart: () => client.delete("/cart/clear"),
  applyCoupon: (data) => client.post("/cart/coupon", data),
};
