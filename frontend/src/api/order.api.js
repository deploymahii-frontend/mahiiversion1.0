import api from "./axios";

export const createOrder = async (data) => {
  const response = await api.post("/orders", data);
  return response.data.data;
};

const orderAPI = {
  async getShopOrders(shopId) {
    const { data } = await api.get(`/orders/shop/${shopId}`);
    return data;
  },

  async getOrder(id) {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },

  async updateStatus(id, status) {
    const { data } = await api.patch(`/orders/${id}/status`, {
      status,
    });

    return data;
  },
};

export default orderAPI;
