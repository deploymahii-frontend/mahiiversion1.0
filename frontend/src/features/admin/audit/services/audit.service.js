import ApiClient from "../../../core/api/ApiClient";

export async function getAuditLogs(params = {}) {
  const { data } = await ApiClient.get(
    "/admin/audit-logs",
    {
      params,
    }
  );

  return data.data;
}
