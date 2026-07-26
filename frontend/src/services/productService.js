import ApiClient from "../core/api/ApiClient";

export async function getProduct(id) {
  const { data } = await ApiClient.get(`/products/${id}`);
  return data.data;
}

export async function getProductBySlug(slug) {
  const { data } = await ApiClient.get(`/products/slug/${slug}`);
  return data.data;
}

export async function getShopProducts(shopId) {
  const { data } = await ApiClient.get(`/products/shop/${shopId}`);
  return data.data;
}

export async function searchProducts(search) {
  const { data } = await ApiClient.get(`/products/search`, {
    params: { search },
  });

  return data.data;
}
