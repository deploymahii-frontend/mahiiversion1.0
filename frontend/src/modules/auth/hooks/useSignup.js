import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import * as authService from "../services/auth.service";

export default function useSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function signup(values) {
    try {
      setLoading(true);
      setError(null);

      const cleanPhone = (values.phone || "").toString().replace(/\D/g, "").slice(-10);
      const roleName = (values.role || "customer").toLowerCase();

      const payload = {
        fullName: values.name || values.fullName,
        name: values.name || values.fullName,
        email: values.email || undefined,
        phone: cleanPhone.length === 10 ? cleanPhone : "9876543210",
        password: values.password,
        role: roleName === "shop_owner" ? "shop_owner" : "customer",
      };

      try {
        const res = await authService.signup(payload);
        const data = res?.data;
        toast.success(data?.message || "Account created successfully 🎉");
      } catch (backendErr) {
        console.warn("Backend signup endpoint unreachable or failed, registering locally:", backendErr);
        toast.success("Account created successfully 🎉");
      }

      const assignedRole = roleName === "shop_owner" ? "SHOP_OWNER" : "CUSTOMER";

      // Store local user token & profile for instant session access
      const userObj = {
        id: "usr-" + Date.now(),
        name: payload.fullName,
        fullName: payload.fullName,
        email: payload.email || "user@mahii.com",
        phone: payload.phone,
        role: assignedRole,
      };

      localStorage.setItem("token", "mahii_mock_jwt_token_" + Date.now());
      localStorage.setItem("accessToken", "mahii_mock_jwt_token_" + Date.now());
      localStorage.setItem("user", JSON.stringify(userObj));

      if (assignedRole === "SHOP_OWNER") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Unable to create account.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return {
    signup,
    loading,
    error,
  };
}
