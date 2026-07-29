import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, authenticated } = useAuth();

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("mahii_token");

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUser = user || storedUser;

  const role = (currentUser?.role?.name || currentUser?.role || "").toUpperCase();

  if (!token && !authenticated) {
    return <Navigate to="/shop/login" replace />;
  }

  if (role && !["SHOP_OWNER", "SHOPOWNER", "ADMIN", "SUPER_ADMIN"].includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
