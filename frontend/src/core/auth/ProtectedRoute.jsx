import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAuthStore from "../../store/authStore";

const getStoredToken = () =>
  localStorage.getItem("mahii_token") ||
  localStorage.getItem("accessToken") ||
  localStorage.getItem("token");

export default function ProtectedRoute({
  allowedRoles = [],
  children,
}) {
  const { user: authUser, authenticated, loading } = useAuth();
  const zustUser = useAuthStore(state => state.user);
  const user = authUser || zustUser;

  if (process.env.NODE_ENV !== "production") {
    console.log('[ProtectedRoute] role detected ->', user?.role ?? user?.role?.name);
  }

  const rawRole = user?.role?.name ?? user?.role ?? "";
  const normalizedAllowed = allowedRoles.map(r => String(r).toUpperCase());
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const token = getStoredToken();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!authenticated && !token) {
    if (isAdminRoute) {
      return <Navigate to="/secure-admin-portal" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0) {
    const currentUserRole = String(rawRole).toUpperCase();

    if (!normalizedAllowed.includes(currentUserRole)) {
      if (isAdminRoute) {
        return <Navigate to="/secure-admin-portal" replace />;
      }
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children || <Outlet />;
}
