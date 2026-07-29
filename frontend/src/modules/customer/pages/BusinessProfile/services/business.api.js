import api from "@/services/api";

export const businessApi = {
  getProfile(slug) {
    return api.get(`/business/${slug}`);
  },
  getProducts(id) {
    return api.get(`/business/${id}/products`);
  },
  getServices(id) {
    return api.get(`/business/${id}/services`);
  },
  getOffers(id) {
    return api.get(`/business/${id}/offers`);
  },
  getReviews(id) {
    return api.get(`/business/${id}/reviews`);
  },
  getMoments(id) {
    return api.get(`/business/${id}/moments`);
  },
  getRelated(id) {
    return api.get(`/business/${id}/related`);
  },
  favorite(id) {
    return api.post(`/business/${id}/favorite`);
  },
};
