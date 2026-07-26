import api from "../../../../services/api";

/**
 * Get shop by slug
 */
export async function getShopBySlug(slug) {
  const { data } = await api.get(`/shops/${slug}`);
  return data.data;
}

/**
 * Get products of a shop
 */
export async function getShopProducts(shopId) {
  const { data } = await api.get("/products", {
    params: {
      shop: shopId,
    },
  });

  return data.data;
}
