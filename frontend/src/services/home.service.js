import api from "@/services/api";

export const getFeaturedShops = () => api.get("/shops/featured");
export const getPopularShops = () => api.get("/shops/popular");
export const getOffers = () => api.get("/offers");
export const getCategories = () => api.get("/categories");
