import axios from "axios";

/**
 * Environment
 */
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

/**
 * Axios Instance
 */
const client = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Get Access Token
 */
function getAccessToken() {
  return (
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    ""
  );
}

/**
 * Request Interceptor
 */
client.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 */
client.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error?.response?.status;

    /**
     * Unauthorized
     */
    if (status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("token");

      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    /**
     * Normalize Error
     */
    const normalizedError = {
      status,
      message:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Something went wrong.",
      errors: error?.response?.data?.errors || null,
      raw: error,
    };

    return Promise.reject(normalizedError);
  }
);

export default client;
