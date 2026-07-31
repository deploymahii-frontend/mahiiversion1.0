import api from "@/services/api";

const addressService = {
  async getAddresses() {
    const { data } = await api.get("/customer/addresses");
    return data.data;
  },

  async createAddress(payload) {
    const { data } = await api.post("/customer/addresses", payload);
    return data.data;
  },

  async updateAddress(id, payload) {
    const { data } = await api.put(`/customer/addresses/${id}`, payload);
    return data.data;
  },

  async deleteAddress(id) {
    await api.delete(`/customer/addresses/${id}`);
  },
};

export default addressService;
