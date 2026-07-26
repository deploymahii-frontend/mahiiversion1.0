import API from "./shop.api";

const momentAPI = {
  async getShopMoments(shopId) {
    const { data } = await API.get(`/moments/shop/${shopId}`);
    return data;
  },

  async likeMoment(id) {
    return API.post(`/moments/${id}/like`);
  },

  async trackView(id) {
    return API.post(`/moments/${id}/view`);
  },

  async trackShopClick(id) {
    return API.post(`/moments/${id}/shop-click`);
  },
};

export default momentAPI;
