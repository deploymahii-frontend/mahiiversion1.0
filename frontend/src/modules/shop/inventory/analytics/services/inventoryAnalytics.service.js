import api from "@/services/api";

export const getAnalytics = () =>
    api.get("/inventory/analytics");

export const exportReport = () =>
    api.get("/inventory/export", {
        responseType: "blob",
    });
