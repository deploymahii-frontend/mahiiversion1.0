import { create } from "zustand";

const initialAccessToken = localStorage.getItem("accessToken");
let initialUser = null;

try {
  initialUser = JSON.parse(localStorage.getItem("user") || "null");
} catch (error) {
  initialUser = null;
}

const useAuthStore = create((set) => ({
  user: initialUser,
  accessToken: initialAccessToken,
  isAuthenticated: !!initialAccessToken && !!initialUser,
  loading: false,

  login(user, accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    set({
      user,
      accessToken,
      isAuthenticated: true,
    });
  },

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },

  setLoading(loading) {
    set({ loading });
  },
}));

export default useAuthStore;
