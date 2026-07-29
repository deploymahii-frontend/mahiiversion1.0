import ApiClient from "../../../core/api/ApiClient";

export async function assignPermissions(roleId, permissions) {
  const { data } = await ApiClient.put(
    `/admin/roles/${roleId}/permissions`,
    { permissions }
  );

  return data.data;
}
