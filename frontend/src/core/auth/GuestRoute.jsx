import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ROUTES } from "../constants/routes";

export default function GuestRoute({ children }) {
  const { authenticated, user, loading } = useAuth();
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (authenticated && token && user) {
    const role = String(user?.role || "").toUpperCase();
    if (role === "ADMIN" || role === "SUPER_ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (role === "SHOP_OWNER" || role === "SHOPOWNER") {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children || <Outlet />;
}
