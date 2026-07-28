import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute({
  allowedRoles = [],
  children,
}) {
  const { user, authenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  const normalizedAllowed = allowedRoles.map(r => String(r).toUpperCase());
  const isAdminRoute = normalizedAllowed.includes("ADMIN") || normalizedAllowed.includes("SUPER_ADMIN");

  if (!authenticated && !token) {
    if (isAdminRoute) {
      return <Navigate to="/admin/login" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0) {
    const currentUserRole = String(user?.role || "").toUpperCase();

    if (!normalizedAllowed.includes(currentUserRole)) {
      if (isAdminRoute) {
        return <Navigate to="/admin/login" replace />;
      }
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children || <Outlet />;
}
