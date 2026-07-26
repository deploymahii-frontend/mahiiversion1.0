import ApiClient from "../../../core/api/ApiClient";

export async function getRoles(params = {}) {
  const { data } = await ApiClient.get(
    "/admin/roles",
    {
      params,
    }
  );

  return data.data;
}

export async function createRole(payload) {
  const { data } = await ApiClient.post(
    "/admin/roles",
    payload
  );

  return data.data;
}

export async function updateRole(id, payload) {
  const { data } = await ApiClient.put(
    `/admin/roles/${id}`,
    payload
  );

  return data.data;
}

export async function deleteRole(id) {
  await ApiClient.delete(`/admin/roles/${id}`);
}
