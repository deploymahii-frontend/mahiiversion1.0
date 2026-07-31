import api from "@/services/api";

const paymentService = {
  async getPaymentMethods() {
    const { data } = await api.get("/customer/payment-methods");
    return data.data;
  },

  async addMethod(payload) {
    const { data } = await api.post("/customer/payment-methods", payload);
    return data.data;
  },

  async deleteMethod(id) {
    await api.delete(`/customer/payment-methods/${id}`);
  },

  async setDefault(id) {
    await api.patch(`/customer/payment-methods/${id}/default`);
  },
};

export default paymentService;
