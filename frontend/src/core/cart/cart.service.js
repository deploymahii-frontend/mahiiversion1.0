import api from "../api/interceptors";

/**
 * Get Cart
 */
export async function getCart() {
  const { data } = await api.get("/cart");
  return data.data;
}

/**
 * Add Item
 */
export async function addItem(productId, quantity = 1) {
  const { data } = await api.post("/cart/add", {
    product: productId,
    quantity,
  });

  return data.data;
}

/**
 * Update Quantity
 */
export async function updateQuantity(productId, quantity) {
  const { data } = await api.patch(`/cart/item/${productId}`, {
    quantity,
  });

  return data.data;
}

/**
 * Remove Item
 */
export async function removeItem(productId) {
  const { data } = await api.delete(`/cart/item/${productId}`);
  return data.data;
}

/**
 * Clear Cart
 */
export async function clearCart() {
  const { data } = await api.delete("/cart");
  return data;
}
