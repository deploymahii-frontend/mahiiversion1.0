import { useEffect } from "react";
import useAuthStore from "@/modules/auth/store/auth.store";

export default function Providers({
  children,
}) {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    // TODO:
    // Fetch current user
    // login(user, token);
  }, [login]);

  return children;
}
