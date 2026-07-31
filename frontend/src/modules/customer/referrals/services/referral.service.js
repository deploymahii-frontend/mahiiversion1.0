import api from "@/services/api";

const referralService = {
  async getReferralDashboard() {
    const { data } = await api.get("/customer/referrals");
    return data.data;
  },

  async claimReward(id) {
    const { data } = await api.post(`/customer/referrals/${id}/claim`);
    return data.data;
  },
};

export default referralService;
