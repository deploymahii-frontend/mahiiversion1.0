import api from "@/services/api";

const membershipService = {
  async getMembership() {
    const { data } = await api.get("/customer/membership");
    return data.data;
  },

  async getPlans() {
    const { data } = await api.get("/customer/membership/plans");
    return data.data;
  },

  async purchase(planId) {
    const { data } = await api.post("/customer/membership/purchase", { planId });
    return data.data;
  },
};

export default membershipService;
