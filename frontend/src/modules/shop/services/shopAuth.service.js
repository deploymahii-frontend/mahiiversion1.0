import api from "@/services/api";

export const loginShop = (payload) =>
    api.post("/auth/login", payload);
