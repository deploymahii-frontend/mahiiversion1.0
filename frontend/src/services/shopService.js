import ApiClient from "../core/api/ApiClient";

export async function getShops(params = {}) {
  const { data } = await ApiClient.get("/shops", {
    params,
  });

  return data.data;
}

export async function getShop(id) {
  const { data } = await ApiClient.get(`/shops/${id}`);
  return data.data;
}

export async function getShopBySlug(slug) {
  const { data } = await ApiClient.get(`/shops/slug/${slug}`);
  return data.data;
}

export async function searchShops(q) {
  const { data } = await ApiClient.get("/shops/search", {
    params: { q },
  });

  return data.data;
}

export async function getNearby(params) {
  const { data } = await ApiClient.get("/shops/nearby", {
    params,
  });

  return data.data;
}
