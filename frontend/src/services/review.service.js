import api from "./api";

const BASE_PATH = "/reviews";

export const getShopReviews = async (shopId, params = {}) => {
  return await api.get(`${BASE_PATH}/shop/${shopId}`, { params });
};

export const checkOrderEligibility = async (orderId) => {
  return await api.get(`${BASE_PATH}/eligibility/${orderId}`);
};

export const getMyReviews = async (params = {}) => {
  return await api.get(`${BASE_PATH}/me`, { params });
};

export const createReview = async (reviewData) => {
  return await api.post(`${BASE_PATH}`, reviewData);
};

export const updateReview = async (id, reviewData) => {
  return await api.patch(`${BASE_PATH}/${id}`, reviewData);
};

export const deleteReview = async (id) => {
  return await api.delete(`${BASE_PATH}/${id}`);
};

export const toggleHelpful = async (id) => {
  return await api.post(`${BASE_PATH}/${id}/helpful`);
};

export const reportReview = async (id, reportData) => {
  return await api.post(`${BASE_PATH}/${id}/report`, reportData);
};

export const replyToReview = async (id, replyData) => {
  return await api.post(`${BASE_PATH}/${id}/reply`, replyData);
};

export const deleteOwnerReply = async (id) => {
  return await api.delete(`${BASE_PATH}/${id}/reply`);
};

export const adminGetReviews = async (params = {}) => {
  return await api.get(`${BASE_PATH}/admin/all`, { params });
};

export const adminUpdateStatus = async (id, status) => {
  return await api.patch(`${BASE_PATH}/admin/${id}/status`, { status });
};
