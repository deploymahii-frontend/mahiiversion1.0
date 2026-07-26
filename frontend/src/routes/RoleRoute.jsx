import { Navigate } from "react-router-dom";
import useAuthStore from "@/modules/auth/store/auth.store";

export default function RoleRoute({
  roles,
  children,
}) {
  const user = useAuthStore(
    (state) => state.user
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
