import ApiClient from '../../../core/api/ApiClient';

const DEFAULT_SHOP_ID = '1';

export async function getShopOverview(shopId = DEFAULT_SHOP_ID) {
  const { data } = await ApiClient.get('/dashboard/shop');
  return data?.data ?? data ?? {};
}

export async function getShopOrders(shopId = DEFAULT_SHOP_ID) {
  const { data } = await ApiClient.get(`/orders/shop/${shopId}`);
  return data?.data ?? data ?? [];
}

export async function getShopProducts(shopId = DEFAULT_SHOP_ID) {
  const { data } = await ApiClient.get(`/products/shop/${shopId}`);
  return data?.data ?? data ?? [];
}

export async function updateOrderStatus(id, status) {
  const { data } = await ApiClient.patch(`/orders/${id}/status`, {
    orderStatus: status,
  });
  return data?.data ?? data ?? null;
}

export async function deleteProduct(id) {
  await ApiClient.delete(`/products/${id}`);
}

export async function toggleProductAvailability(id, available) {
  const { data } = await ApiClient.patch(`/products/${id}`, {
    available,
  });
  return data?.data ?? data ?? null;
}
