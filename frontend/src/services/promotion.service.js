import api from "./api";

const BASE_PATH = "/promotions";

export const getNearbyPromotions = async (lat, lng, radius = 5000) => {
  return await api.get(`${BASE_PATH}/nearby`, {
    params: { lat, lng, radius }
  });
};

export const getShopPromotions = async (shopId) => {
  return await api.get(`${BASE_PATH}/shop/${shopId}`);
};

export const recordPromotionView = async (promoId) => {
  return await api.post(`${BASE_PATH}/${promoId}/view`);
};

export const recordPromotionClick = async (promoId) => {
  return await api.post(`${BASE_PATH}/${promoId}/click`);
};
