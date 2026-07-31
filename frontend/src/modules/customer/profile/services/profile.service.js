import api from "@/services/api";

const profileService = {
  async getProfile() {
    const { data } = await api.get("/customer/profile");
    return data.data;
  },

  async updateProfile(payload) {
    const { data } = await api.put("/customer/profile", payload);
    return data.data;
  },
};

export default profileService;
