import { useState, useEffect } from "react";


import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FiShield, FiLock, FiMail, FiEye, FiEyeOff,
  FiArrowRight, FiKey, FiCheckCircle, FiAlertTriangle
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const ADMIN_SECRET_KEY = "swaadsetu_admin_secret_key_2026_newkey";

export default function SecureAdminPortal() {
  const navigate = useNavigate();
  const { login: setAuthContextState } = useAuth();

  // Steps: 1 = Secret Key, 2 = Credentials
  const [step, setStep] = useState(1);
  const [secretKey, setSecretKey] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shakeError, setShakeError] = useState(false);

  // Restore step if admin gate already verified
  useEffect(() => {
    const gate = sessionStorage.getItem("__mahii_admin_gate");
    if (gate === "verified") {
      setStep(2);
    }
  }, []);

  function triggerShake() {
    setShakeError(true);
    setTimeout(() => setShakeError(false), 600);
  }

  function handleVerifySecret(e) {
    e.preventDefault();
    setError(null);

    if (secretKey.trim() !== ADMIN_SECRET_KEY) {
      setError("Invalid security key. Access denied.");
      toast.error("❌ Security key verification failed.");
      triggerShake();
      return;
    }

    // Store in session so refresh doesn't lose the gate
    sessionStorage.setItem("__mahii_admin_gate", "verified");
    toast.success("🔓 Security key verified!");
    setStep(2);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      const { user, accessToken, refreshToken } = res.data?.data || res.data || {};

      const normalizedRole = String(user?.role?.name ?? user?.role ?? "").toUpperCase();

      if (!user || (normalizedRole !== "ADMIN" && normalizedRole !== "SUPER_ADMIN")) {
        setError("This account does not have admin privileges.");
        toast.error("Access denied. Admin role required.");
        setLoading(false);
        triggerShake();
        return;
      }
      

      localStorage.setItem("token", accessToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("mahii_token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      if (setAuthContextState) {
        setAuthContextState(user, accessToken, refreshToken);
      }

      toast.success("Welcome, Admin! 🛡️");
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || "Authentication failed. Check credentials.";
      setError(msg);
      toast.error(msg);
      triggerShake();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Secure Portal | Mahii</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans select-none">
        <div
          className={`w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8 relative overflow-hidden transition-transform ${
            shakeError ? "animate-[shake_0.5s_ease-in-out]" : ""
          }`}
        >
          {/* Background glows */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-3 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-orange-500/20 text-white">
              <FiShield size={32} />
            </div>
            <span className="inline-block bg-red-500/10 text-red-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-red-500/20">
              🔒 Restricted Area • Classified
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Mahii Master Control
            </h1>
            <p className="text-xs text-slate-500">
              Authorized System Administrators Only
            </p>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-center gap-3 relative z-10">
            <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
              step === 1
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            }`}>
              {step > 1 ? <FiCheckCircle size={12} /> : <FiKey size={12} />}
              Security Key
            </div>
            <div className="w-6 h-px bg-slate-700" />
            <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
              step === 2
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                : "bg-slate-800 text-slate-500 border border-slate-700"
            }`}>
              <FiLock size={12} />
              Credentials
            </div>
          </div>

          {/* ─── STEP 1: Secret Key ─── */}
          {step === 1 && (
            <form onSubmit={handleVerifySecret} className="space-y-5 relative z-10">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Admin Secret Key
                </label>
                <div className="relative">
                  <FiKey className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="password"
                    required
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Enter the secret admin key..."
                    autoComplete="off"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-950/50 border border-red-800/80 rounded-xl text-xs text-red-400 font-medium flex items-center gap-2">
                  <FiAlertTriangle size={14} /> {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition flex items-center justify-center gap-2 text-sm"
              >
                <FiShield size={16} />
                <span>Verify Security Key</span>
              </button>
            </form>
          )}

          {/* ─── STEP 2: Credentials ─── */}
          {step === 2 && (
            <form onSubmit={handleLogin} className="space-y-5 relative z-10">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@mahii.dev"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Password
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
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-950/50 border border-red-800/80 rounded-xl text-xs text-red-400 font-medium flex items-center gap-2">
                  <FiAlertTriangle size={14} /> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition flex items-center justify-center gap-2 text-sm disabled:opacity-60"
              >
                <span>{loading ? "Authenticating..." : "Login to Admin Portal"}</span>
                <FiArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => { setStep(1); setError(null); setSecretKey(""); sessionStorage.removeItem("__mahii_admin_gate"); }}
                className="w-full text-xs text-slate-500 hover:text-slate-300 transition text-center"
              >
                ← Back to Security Key
              </button>
            </form>
          )}

          {/* Footer */}
          <p className="text-[11px] text-center text-slate-600 leading-relaxed border-t border-slate-800/80 pt-4 relative z-10">
            ⚠️ Unauthorized access attempts are monitored and logged.
            Intruders will be blocked automatically by Mahii Firewall.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
      `}</style>
    </>
  );
}
