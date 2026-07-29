import ApiClient from "../../../core/api/ApiClient";

/*
|--------------------------------------------------------------------------
| Orders
|--------------------------------------------------------------------------
*/

export async function getOrders(params = {}) {
  const { data } = await ApiClient.get(
    "/admin/orders",
    {
      params,
    }
  );

  return data.data;
}

export async function getOrder(id) {
  const { data } = await ApiClient.get(
    `/admin/orders/${id}`
  );

  return data.data;
}

export async function updateOrderStatus(id, status) {
  const { data } = await ApiClient.patch(
    `/admin/orders/${id}/status`,
    {
      status,
    }
  );

  return data.data;
}

export async function deleteOrder(id) {
  await ApiClient.delete(`/admin/orders/${id}`);
}
