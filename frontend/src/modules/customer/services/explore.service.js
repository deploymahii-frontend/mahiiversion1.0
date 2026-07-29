import api from "@/services/api";

export const searchShops = (params) =>
    api.get("/shops/search", { params });

export const getCategories = () =>
    api.get("/categories");

export const getShop = (slug) =>
    api.get(`/shops/${slug}`);

export const getSimilarShops = (slug) =>
    api.get(`/shops/${slug}/similar`);
