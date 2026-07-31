import api from "@/services/api";

const settingsService = {
  async getSettings() {
    const { data } = await api.get("/customer/settings");
    return data.data;
  },

  async updateSettings(payload) {
    const { data } = await api.patch("/customer/settings", payload);
    return data.data;
  },
};

export default settingsService;
