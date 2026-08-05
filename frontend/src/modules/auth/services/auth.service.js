import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    timeout: 30000,
});

const getAccessToken = () =>
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("mahii_token") ||
    localStorage.getItem("authToken");

const getRefreshToken = () =>
    localStorage.getItem("refreshToken") ||
    localStorage.getItem("mahii_refresh_token") ||
    localStorage.getItem("refresh_token");

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
};

const clearAuthStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("mahii_token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("mahii_refresh_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
};

const isAdminAuthPath = (pathname = window.location.pathname) =>
    pathname.includes("/admin") || pathname.includes("/secure-admin-portal");

const redirectAfterUnauthorized = () => {
    const path = window.location.pathname;
    if (path.includes("/login") || path.includes("/secure-admin-portal")) {
        return;
    }
    if (isAdminAuthPath(path)) {
        window.location.href = "/secure-admin-portal";
    } else {
        window.location.href = "/login";
    }
};

API.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = getRefreshToken() || getCookie("refreshToken");
                const refreshPayload = refreshToken ? { refreshToken } : {};

                const refreshResponse = await axios.post(
                    `${API.defaults.baseURL}/auth/refresh`,
                    refreshPayload,
                    {
                        withCredentials: true,
                        headers: refreshToken
                            ? { "X-Refresh-Token": refreshToken }
                            : undefined,
                    }
                );

                const newAccessToken =
                    refreshResponse?.data?.data?.accessToken ||
                    refreshResponse?.data?.accessToken ||
                    refreshResponse?.data?.token;
                const newRefreshToken =
                    refreshResponse?.data?.data?.refreshToken ||
                    refreshResponse?.data?.refreshToken ||
                    refreshResponse?.data?.refresh_token;

                if (newAccessToken) {
                    localStorage.setItem("accessToken", newAccessToken);
                    localStorage.setItem("token", newAccessToken);
                    localStorage.setItem("mahii_token", newAccessToken);
                    if (newRefreshToken) {
                        localStorage.setItem("refreshToken", newRefreshToken);
                        localStorage.setItem("mahii_refresh_token", newRefreshToken);
                        localStorage.setItem("refresh_token", newRefreshToken);
                    }
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return API(originalRequest);
                }
            } catch (e) {
                clearAuthStorage();
                redirectAfterUnauthorized();
                return Promise.reject(e);
            }
        }

        if (error.response?.status === 401) {
            clearAuthStorage();
            redirectAfterUnauthorized();
        }

        return Promise.reject(error);
    }
);

export const signup = (payload) =>
    API.post("/auth/signup", payload);

export const login = (payload) =>
    API.post("/auth/login", payload);

export const verifyOtp = (payload) =>
    API.post("/auth/verify-otp", payload);

export const resendOtp = (payload) =>
    API.post("/auth/resend-otp", payload);

export const forgotPassword = (payload) =>
    API.post("/auth/forgot-password", payload);

export const resetPassword = (payload) =>
    API.post("/auth/reset-password", payload);

export const logout = () =>
    API.post("/auth/logout");

export const getProfile = () =>
    API.get("/users/me");

export const updateProfile = (payload) =>
    API.put("/users/me", payload);

export default API;
