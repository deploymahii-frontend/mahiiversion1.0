import ApiClient from "../../../../core/api/ApiClient";

export async function getSystemSettings() {
  const { data } = await ApiClient.get("/admin/system-settings");
  return data.data;
}

export async function updateGeneralSettings(payload) {
  const { data } = await ApiClient.put("/admin/system-settings/general", payload);
  return data.data;
}

export async function updateOrganizationSettings(payload) {
  const { data } = await ApiClient.put("/admin/system-settings/organization", payload);
  return data.data;
}

export async function updateEmailSettings(payload) {
  const { data } = await ApiClient.put("/admin/system-settings/email", payload);
  return data.data;
}

export async function updateSmsSettings(payload) {
  const { data } = await ApiClient.put("/admin/system-settings/sms", payload);
  return data.data;
}

export async function updatePaymentSettings(payload) {
  const { data } = await ApiClient.put("/admin/system-settings/payment", payload);
  return data.data;
}

export async function updateStorageSettings(payload) {
  const { data } = await ApiClient.put("/admin/system-settings/storage", payload);
  return data.data;
}

export async function updateOAuthSettings(payload) {
  const { data } = await ApiClient.put("/admin/system-settings/oauth", payload);
  return data.data;
}

export async function updateLocalizationSettings(payload) {
  const { data } = await ApiClient.put("/admin/system-settings/localization", payload);
  return data.data;
}

export async function updateMaintenanceSettings(payload) {
  const { data } = await ApiClient.put("/admin/system-settings/maintenance", payload);
  return data.data;
}

export async function updateEnvironmentSettings(payload) {
  const { data } = await ApiClient.put("/admin/system-settings/environment", payload);
  return data.data;
}
