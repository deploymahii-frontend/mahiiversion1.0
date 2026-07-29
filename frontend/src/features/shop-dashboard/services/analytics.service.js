import ApiClient from '../../../core/api/ApiClient';

export async function getShopDashboardAnalytics(shopId = '1') {
  const { data } = await ApiClient.get(`/analytics/shop/dashboard?shopId=${shopId}`);
  return data?.data ?? data ?? {};
}
