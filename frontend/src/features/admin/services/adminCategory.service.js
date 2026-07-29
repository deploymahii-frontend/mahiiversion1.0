import api from "../../../core/api";

/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
*/

export async function getCategories(params = {}) {
  const { data } = await api.get(
    "/admin/categories",
    {
      params,
    }
  );

  return data.data;
}

export async function getCategory(id) {
  const { data } = await api.get(
    `/admin/categories/${id}`
  );

  return data.data;
}

export async function createCategory(payload) {
  const { data } = await api.post(
    "/admin/categories",
    payload
  );

  return data.data;
}

export async function updateCategory(id, payload) {
  const { data } = await api.put(
    `/admin/categories/${id}`,
    payload
  );

  return data.data;
}

export async function updateCategoryStatus(
  id,
  status
) {
  const { data } = await api.patch(
    `/admin/categories/${id}/status`,
    { status }
  );

  return data.data;
}

export async function deleteCategory(id) {
  await api.delete(
    `/admin/categories/${id}`
  );
}
