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
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("mahii_refresh_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

const isProtectedPath = () => {
  const pathname = window.location.pathname;
  return (
    pathname.includes("/admin") ||
    pathname.includes("/shopowner") ||
    pathname.includes("/checkout") ||
    pathname.includes("/customer/dashboard")
  );
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Do not attempt token refresh for auth endpoints themselves
    if (originalRequest?.url?.includes("/auth/")) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken() || getCookie("refreshToken");

      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            `${api.defaults.baseURL}/auth/refresh`,
            { refreshToken },
            {
              withCredentials: true,
              headers: { "X-Refresh-Token": refreshToken },
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
          if (isProtectedPath()) {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      } else {
        clearAuthStorage();
        if (isProtectedPath()) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
