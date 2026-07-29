import api from "@/services/api";

/**
 * Owner Login
 * POST /api/v1/auth/login
 */
export async function login(credentials) {
  const response = await api.post("/auth/login", credentials);

  return response.data;
}

/**
 * Get Current User
 * (Future)
 */
export async function getCurrentUser() {
  const response = await api.get("/users/me");

  return response.data;
}
