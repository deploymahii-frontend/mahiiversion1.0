import api from "@/services/api";

const dashboardService = {
  async getDashboard() {
    const { data } = await api.get("/customer/dashboard");
    return data.data;
  },
};

export default dashboardService;
