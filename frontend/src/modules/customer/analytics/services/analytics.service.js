import api from "@/services/api";

const analyticsService = {
  async getDashboard() {
    const { data } = await api.get("/customer/analytics");
    return data.data;
  },
};

export default analyticsService;
