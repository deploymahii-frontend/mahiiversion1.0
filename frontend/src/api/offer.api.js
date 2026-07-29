import API from "./shop.api";

const offerAPI = {
  async getShopOffers(shopId) {
    const { data } = await API.get(`/offers/shop/${shopId}`);
    return data;
  },
};

export default offerAPI;
