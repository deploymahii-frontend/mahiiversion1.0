import client from "./client.js";

export const authApi = {
  login: (data) => client.post("/auth/login", data),
  signup: (data) => client.post("/auth/signup", data),
  logout: () => client.post("/auth/logout"),
  getProfile: () => client.get("/auth/profile"),
  refreshToken: () => client.post("/auth/refresh-token"),
  forgotPassword: (data) => client.post("/auth/forgot-password", data),
  resetPassword: (data) => client.post("/auth/reset-password", data),
  changePassword: (data) => client.post("/auth/change-password", data),
  getActiveSessions: () => client.get("/auth/sessions"),
  logoutAll: () => client.post("/auth/logout-all"),
};
