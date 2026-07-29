import { login as loginApi } from "./auth.api";

const TOKEN_KEY = "mahii_owner_token";
const USER_KEY = "mahii_owner_user";

/**
 * Login Owner
 */
export async function login(credentials) {
  const response = await loginApi(credentials);

  if (!response.success) {
    throw new Error(response.message || "Login failed");
  }

  const { token, user } = response.data;

  // Security Check
  if (user.role !== "SHOP_OWNER" && user.role !== "ADMIN") {
    throw new Error("Access denied. Owner account required.");
  }

  saveToken(token);
  saveUser(user);

  return user;
}

/**
 * Logout Owner
 */
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Save JWT
 */
export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Read JWT
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Save Logged User
 */
export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Read Logged User
 */
export function getUser() {
  const user = localStorage.getItem(USER_KEY);

  if (!user) return null;

  return JSON.parse(user);
}

/**
 * Is Logged In
 */
export function isAuthenticated() {
  return !!getToken();
}
