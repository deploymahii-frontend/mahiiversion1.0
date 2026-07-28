// src/services/auth.service.js

import api from "./api";

const authService = {
    signup(data) {
        return api.post("/auth/signup", data);
    },
    login(data) {
        return api.post("/auth/login", data);
    },
    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },
    me() {
        return api.get("/auth/me");
    },
    refresh() {
        return api.post("/auth/refresh");
    },
};

export default authService;
