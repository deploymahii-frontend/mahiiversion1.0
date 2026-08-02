import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    timeout: 30000,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (
            error.response?.status === 401 &&
            !error.config._retry
        ) {
            error.config._retry = true;

            try {
                const { data } = await API.post(
                    "/auth/refresh"
                );

                localStorage.setItem(
                    "accessToken",
                    data.data.accessToken
                );

                error.config.headers.Authorization =
                    `Bearer ${data.data.accessToken}`;

                return API(error.config);
            } catch (e) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
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
