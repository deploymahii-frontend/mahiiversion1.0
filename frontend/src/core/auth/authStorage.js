import { STORAGE_KEYS } from "../constants/storage";

export const authStorage = {
  getToken() {
    return (
      localStorage.getItem(STORAGE_KEYS.TOKEN) ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token")
    );
  },

  setToken(token) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("token", token);
  },

  removeToken() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
  },

  getUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER);

    return user ? JSON.parse(user) : null;
  },

  setUser(user) {
    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(user)
    );
  },

  clear() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};
