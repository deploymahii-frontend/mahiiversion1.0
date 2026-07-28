import api from "@/services/api";

export const getAnalytics = () =>
    api.get("/offers/analytics");

export const getOfferHistory = (id) =>
    api.get(`/offers/${id}/history`);

export const exportAnalytics = () =>
    api.get("/offers/analytics/export", {
        responseType: "blob",
    });
