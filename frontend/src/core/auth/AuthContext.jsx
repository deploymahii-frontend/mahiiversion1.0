import {
  createContext,
  useEffect,
  useState,
} from "react";

import * as authService from "../../services/authService";
import { authStorage } from "./authStorage";
import { ROLES } from "../constants/roles";

export const AuthContext = createContext(null);

export default function AuthProvider({
  children,
}) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = authStorage.getUser();

    if (storedUser) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  async function login(credentials) {
    const result = await authService.login(credentials);

    if (!result?.token || !result?.user) {
      throw new Error("Invalid authentication response");
    }

    authStorage.setToken(result.token);
    authStorage.setUser(result.user);

    setUser(result.user);

    return result.user;
  }

  function logout() {
    authStorage.clear();

    setUser(null);
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === ROLES.ADMIN,
    isShopOwner: user?.role === ROLES.SHOP_OWNER,
    isCustomer: user?.role === ROLES.CUSTOMER,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
