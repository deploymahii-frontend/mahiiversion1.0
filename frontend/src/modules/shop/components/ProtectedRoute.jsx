import { Navigate } from "react-router-dom";
import useAuthStore from "../../../modules/auth/store/auth.store";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  if (!isAuthenticated || !user) {
    return <Navigate to="/shop/login" replace />;
  }

  const role = (user?.role?.name || user?.role || "").toUpperCase();

  if (role && !["SHOP_OWNER", "SHOPOWNER", "ADMIN", "SUPER_ADMIN"].includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
