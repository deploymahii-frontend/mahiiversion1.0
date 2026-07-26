import { create } from "zustand";

const initialAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const useAuthStore = create((set) => ({
  ...initialAuthState,

  login: (user, token) => {
    localStorage.setItem("mahii_token", token);
    localStorage.setItem("mahii_user", JSON.stringify(user));

    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("mahii_token");
    localStorage.removeItem("mahii_user");

    set({ ...initialAuthState });
  },

  restoreSession: () => {
    const token = localStorage.getItem("mahii_token");
    const storedUser = localStorage.getItem("mahii_user");

    if (!token) {
      set({ ...initialAuthState });
      return;
    }

    set({
      user: storedUser ? JSON.parse(storedUser) : null,
      token,
      isAuthenticated: true,
    });
  },
}));

export const authStore = useAuthStore;
