import api from "@/services/api";

export const getDashboard = () =>
    api.get("/shop/dashboard");

export const getRevenue = () =>
    api.get("/shop/analytics/revenue");
