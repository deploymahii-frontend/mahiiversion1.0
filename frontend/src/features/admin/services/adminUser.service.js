import ApiClient from "../../../core/api/ApiClient";

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

export async function getUsers(params = {}) {
  const { data } = await ApiClient.get(
    "/admin/users",
    {
      params,
    }
  );

  return data.data;
}

export async function getUser(id) {
  const { data } = await ApiClient.get(
    `/admin/users/${id}`
  );

  return data.data;
}

export async function updateUserStatus(
  id,
  status
) {
  const { data } = await ApiClient.patch(
    `/admin/users/${id}/status`,
    {
      status,
    }
  );

  return data.data;
}

export async function updateUserRole(
  id,
  role
) {
  const { data } = await ApiClient.patch(
    `/admin/users/${id}/role`,
    {
      role,
    }
  );

  return data.data;
}

export async function deleteUser(id) {
  await ApiClient.delete(
    `/admin/users/${id}`
  );
}
