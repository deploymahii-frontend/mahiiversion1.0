import ApiClient from "../../../core/api/ApiClient";

export async function getAdminSecurity() {
  const { data } = await ApiClient.get("/admin/security");
  return data.data;
}
