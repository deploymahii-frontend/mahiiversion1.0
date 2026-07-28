import api from "./api";

const BASE_PATH = "/reviews";

export const getShopReviews = async (shopId) => {
  return await api.get(`${BASE_PATH}/shop/${shopId}`);
};

export const getMyReviews = async () => {
  return await api.get(`${BASE_PATH}/me`);
};

export const createReview = async (reviewData) => {
  return await api.post(`${BASE_PATH}`, reviewData);
};

export const deleteReview = async (id) => {
  return await api.delete(`${BASE_PATH}/${id}`);
};
