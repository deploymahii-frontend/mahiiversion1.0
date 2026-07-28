import { Navigate } from "react-router-dom";
import useAuthStore from "@/modules/auth/store/auth.store";

export default function RoleRoute({
  roles,
  children,
}) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = String(user.role || "").toLowerCase();
  const allowedRoles = roles.map((role) => String(role).toLowerCase());

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
