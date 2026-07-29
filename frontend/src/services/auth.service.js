// src/services/auth.service.js

import api from "./api";

export const signup = (data) => api.post("/auth/signup", data);
export const login = (data) => api.post("/auth/login", data);
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};
export const me = () => api.get("/auth/me");
export const refresh = () => api.post("/auth/refresh");

export const firebaseSync = (firebaseIdToken) => {
    return api.post("/auth/firebase-sync", {}, {
        headers: {
            Authorization: `Bearer ${firebaseIdToken}`
        }
    });
};

const authService = {
    signup,
    login,
    logout,
    me,
    refresh,
    firebaseSync
};

export default authService;
