import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import * as authService from "../services/auth.service";
import { useAuth } from "../../../context/AuthContext";

export default function useLogin() {
  const navigate = useNavigate();
  const { login: setAuthContextState } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function login(values) {
    try {
      setLoading(true);
      setError(null);

      const rawIdentifier = (values.identifier || values.email || values.phone || "").trim();
      const isEmail = rawIdentifier.includes("@");
      const cleanPhone = rawIdentifier.replace(/\D/g, "");

      const payload = {
        identifier: rawIdentifier,
        email: isEmail ? rawIdentifier : undefined,
        phone: !isEmail && cleanPhone ? cleanPhone.slice(-10) : undefined,
        mobile: !isEmail && cleanPhone ? cleanPhone.slice(-10) : undefined,
        password: values.password,
        role: values.role, // Pass the role from UI to backend if needed
      };

      const res = await authService.login(payload);
      const data = res?.data?.data || res?.data;

      if (!data || !data.user || !data.accessToken) {
        throw new Error("Invalid login response from server.");
      }

      const userObj = data.user;
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      localStorage.setItem("user", JSON.stringify(userObj));

      if (setAuthContextState) {
        setAuthContextState(userObj, accessToken, refreshToken);
      }

      toast.success("Welcome back! Login Successful 🎉");

      const normalizedRole = String(userObj?.role || userObj?.role?.name || "").toUpperCase();

      switch (normalizedRole) {
        case "SUPER_ADMIN":
        case "ADMIN":
          navigate("/admin/dashboard");
          break;

        case "SHOP_OWNER":
        case "SHOPOWNER":
          navigate("/dashboard");
          break;

        default:
          navigate("/");
      }
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Unable to login.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
    error,
  };
}
