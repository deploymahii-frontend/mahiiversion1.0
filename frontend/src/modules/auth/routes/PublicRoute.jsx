import { Navigate } from "react-router-dom";
import useAuthStore from "@/modules/auth/store/auth.store";

export default function PublicRoute({ children }) {
  const authenticated = useAuthStore((state) => state.isAuthenticated);

  if (authenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
