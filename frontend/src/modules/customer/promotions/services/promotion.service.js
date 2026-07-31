import api from "@/services/api";

const promotionService = {
  async getCoupons() {
    const { data } = await api.get("/customer/coupons");
    return data.data;
  },

  async applyCoupon(code) {
    const { data } = await api.post("/customer/coupons/apply", { code });
    return data.data;
  },
};

export default promotionService;
