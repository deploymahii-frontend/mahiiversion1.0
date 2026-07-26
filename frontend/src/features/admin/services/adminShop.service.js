import ApiClient from '../../../core/api/ApiClient';

export async function getAdminShops() {
  const { data } = await ApiClient.get('/admin/shops');
  return data?.data ?? data ?? [];
}

export async function getAdminShop(id) {
  const { data } = await ApiClient.get(`/admin/shops/${id}`);
  return data?.data ?? data ?? null;
}

export async function updateShopStatus(id, status) {
  const { data } = await ApiClient.patch(`/admin/shops/${id}/status`, {
    status,
  });
  return data?.data ?? data ?? null;
}

export async function deleteShop(id) {
  const { data } = await ApiClient.delete(`/admin/shops/${id}`);
  return data?.data ?? data ?? null;
}
