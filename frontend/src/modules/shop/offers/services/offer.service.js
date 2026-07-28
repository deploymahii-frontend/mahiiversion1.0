import api from "@/services/api";

export const getOffers = (params = {}) =>
    api.get("/offers/shop", { params });

export const getOffer = (id) =>
    api.get(`/offers/${id}`);

export const createOffer = (data) =>
    api.post("/offers", data);

export const updateOffer = (id, data) =>
    api.put(`/offers/${id}`, data);

export const deleteOffer = (id) =>
    api.delete(`/offers/${id}`);

export const toggleOffer = (id) =>
    api.patch(`/offers/${id}/toggle`);
