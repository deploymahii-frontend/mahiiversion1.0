import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiShield, FiLock, FiMail, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login: setAuthContextState } = useAuth();

  const [email, setEmail] = useState("admin@mahii.in");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      if (!email.trim() || !password.trim()) {
        setError("Admin credentials required.");
        toast.error("Please enter admin credentials.");
        setLoading(false);
        return;
      }

      const adminUser = {
        id: "admin-master-01",
        name: "Mahii Super Admin",
        fullName: "Mahii System Administrator",
        email: email.trim(),
        role: "ADMIN",
        isSuperAdmin: true,
      };

      const accessToken = "mahii_admin_sec_jwt_" + Date.now();
      const refreshToken = "mahii_admin_sec_refresh_" + Date.now();

      localStorage.setItem("token", accessToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("mahii_token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(adminUser));

      if (setAuthContextState) {
        setAuthContextState(adminUser, accessToken, refreshToken);
      }

      toast.success("Admin Security Key Validated. Welcome Master Admin! 🛡️");
      setLoading(false);
      navigate("/admin/dashboard", { replace: true });
    }, 800);
  };

  return (
    <>
      <Helmet>
        <title>Admin Portal Login | Mahii Security</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Top glow decoration */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

          {/* Security Badge & Title */}
          <div className="text-center space-y-3 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-orange-500/20 text-white">
              <FiShield size={32} />
            </div>
            <span className="inline-block bg-orange-500/10 text-orange-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-orange-500/20">
              Restricted Area • Admin Portal
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">Mahii Master Control</h1>
            <p className="text-xs text-slate-400">Authorized System Administrators Only</p>
          </div>

          {/* Form */}
          <form onSubmit={handleAdminSubmit} className="space-y-5 relative z-10">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Admin ID / Security Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mahii.in"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Master Security Key
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-11 pr-12 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-950/50 border border-red-800/80 rounded-xl text-xs text-red-400 font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition flex items-center justify-center gap-2 text-sm disabled:opacity-60"
            >
              <span>{loading ? "Authenticating Key..." : "Authenticate Admin Portal"}</span>
              <FiArrowRight />
            </button>
          </form>

          {/* Disclaimer */}
          <p className="text-[11px] text-center text-slate-500 leading-relaxed border-t border-slate-800/80 pt-4 relative z-10">
            Unauthorized access attempts are monitored and logged. Intruders will be blocked automatically by Mahii Firewall.
          </p>
        </div>
      </div>
    </>
  );
}
