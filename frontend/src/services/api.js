import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

const getAccessToken = () =>
    localStorage.getItem("mahii_token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
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
    localStorage.removeItem("mahii_token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("mahii_refresh_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
};

const shouldRedirectToSecurePortal = () => {
    const pathname = window.location.pathname;
    return pathname.includes("/admin") || pathname.includes("/secure-admin-portal");
};

const redirectAfterUnauthorized = () => {
    const pathname = window.location.pathname;
    if (pathname.includes("/login") || pathname.includes("/secure-admin-portal")) {
        return;
    }

    if (shouldRedirectToSecurePortal()) {
        window.location.href = "/secure-admin-portal";
    } else {
        window.location.href = "/login";
    }
};

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
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
                    `${api.defaults.baseURL}/auth/refresh`,
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
                    return api(originalRequest);
                }
            } catch (refreshError) {
                clearAuthStorage();
                redirectAfterUnauthorized();
                return Promise.reject(refreshError);
            }
        }

        if (error.response?.status === 401) {
            clearAuthStorage();
            redirectAfterUnauthorized();
        }

        return Promise.reject(error);
    }
);

export default api;
