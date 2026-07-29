import ApiClient from "../../../core/api/ApiClient";

export async function getAdminAnalytics() {
  const { data } = await ApiClient.get("/admin/analytics");
  return data.data;
}
