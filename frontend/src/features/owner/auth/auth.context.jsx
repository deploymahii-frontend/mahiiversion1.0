import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as authService from "./auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  function restoreSession() {
    try {
      if (authService.isAuthenticated()) {
        const storedUser = authService.getUser();

        if (storedUser) {
          setUser(storedUser);
        }
      }
    } finally {
      setLoading(false);
    }
  }

  async function login(credentials) {
    const loggedUser = await authService.login(credentials);

    setUser(loggedUser);

    return loggedUser;
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside AuthProvider"
    );
  }

  return context;
}
