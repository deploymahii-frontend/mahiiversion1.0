import { LogOut } from "lucide-react";
import useAuthStore from "@/modules/auth/store/auth.store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LogoutCard() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full py-4 rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold flex items-center justify-center gap-2 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition border border-rose-100 dark:border-rose-900/40 shadow-sm"
    >
      <LogOut size={20} />
      Log Out of Account
    </button>
  );
}
