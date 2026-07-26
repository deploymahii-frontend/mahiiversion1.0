import ApiClient from "../../../core/api/ApiClient";

export async function getAdminBackups() {
  const { data } = await ApiClient.get("/admin/backups");
  return data?.data ?? data ?? {};
}

export async function createBackup(payload) {
  const { data } = await ApiClient.post("/admin/backups/create", payload);
  return data?.data ?? data ?? {};
}

export async function restoreBackup(payload) {
  const { data } = await ApiClient.post("/admin/backups/restore", payload);
  return data?.data ?? data ?? {};
}

export async function getBackupHistory() {
  const { data } = await ApiClient.get("/admin/backups/history");
  return data?.data ?? data ?? [];
}

export async function deleteBackup(id) {
  const { data } = await ApiClient.delete(`/admin/backups/${id}`);
  return data?.data ?? data ?? {};
}

export async function scheduleBackup(payload) {
  const { data } = await ApiClient.post("/admin/backups/schedule", payload);
  return data?.data ?? data ?? {};
}

export async function getBackupStorage() {
  const { data } = await ApiClient.get("/admin/backups/storage");
  return data?.data ?? data ?? {};
}

export async function getBackupHealth() {
  const { data } = await ApiClient.get("/admin/backups/health");
  return data?.data ?? data ?? {};
}
