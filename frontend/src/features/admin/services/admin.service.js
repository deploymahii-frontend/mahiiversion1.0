import ApiClient from '../../../core/api/ApiClient';

export async function getAdminDashboard() {
  const { data } = await ApiClient.get('/admin/dashboard');
  return data?.data ?? data ?? {};
}
