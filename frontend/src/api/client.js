import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://mahiiversion1-0-1.onrender.com/api/v1",
  timeout: 10000,
  withCredentials: true,
});

// Request Interceptor
client.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("mahii_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // try to include any stored refresh token (fallback to header/body)
        const storedRefresh =
          localStorage.getItem("refreshToken") ||
          localStorage.getItem("mahii_refresh_token") ||
          localStorage.getItem("refresh_token");

        const refreshPayload = storedRefresh ? { refreshToken: storedRefresh } : {};
        const refreshHeaders = storedRefresh ? { "X-Refresh-Token": storedRefresh } : undefined;

        const res = await axios.post(
          `${client.defaults.baseURL}/auth/refresh`,
          refreshPayload,
          { withCredentials: true, headers: refreshHeaders }
        );
        const newAccessToken = res.data?.data?.accessToken || res.data?.token;
        if (newAccessToken) {
          localStorage.setItem("token", newAccessToken);
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("mahii_token", newAccessToken);
          client.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return client(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("mahii_token");
        localStorage.removeItem("user");
        localStorage.removeItem("mahii_user");
        return Promise.reject(refreshError);
      }
    }

    const message = error.response?.data?.message || error.message || "An unexpected error occurred.";
    console.error("API Error:", message);
    
    return Promise.reject(error);
  }
);

export default client;
