import ApiClient from "../core/api/ApiClient";

export async function getCart() {
  const { data } = await ApiClient.get("/cart");
  return data.data;
}

export async function addToCart(productId, quantity) {
  const { data } = await ApiClient.post("/cart", {
    productId,
    quantity,
  });

  return data.data;
}

export async function updateQuantity(productId, quantity) {
  const { data } = await ApiClient.put(`/cart/${productId}`, {
    quantity,
  });

  return data.data;
}

export async function removeFromCart(productId) {
  const { data } = await ApiClient.delete(`/cart/${productId}`);
  return data.data;
}

export async function clearCart() {
  const { data } = await ApiClient.delete("/cart");
  return data.data;
}
