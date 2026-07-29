import ApiClient from "../../../core/api/ApiClient";

export async function getPlatformSettings() {
  const { data } = await ApiClient.get("/admin/platform-settings");
  return data.data;
}

export async function savePlatformSettings(payload) {
  const { data } = await ApiClient.put(
    "/admin/platform-settings",
    payload
  );
  return data.data;
}
