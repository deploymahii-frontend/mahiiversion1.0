import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store.js";

export default function GuestRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="dashboard" replace />;
  }

  return children;
}
