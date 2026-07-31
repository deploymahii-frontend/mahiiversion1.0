import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FiShoppingBag, FiPhone, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { loginShop } from "../services/shopAuth.service";
import useAuthStore from "../../auth/store/auth.store";

export default function LoginPage() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ phone: "", password: "" });

    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
        return <Navigate to="/shop/dashboard" replace />;
    }

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await loginShop(form);
            
            // Sync with global auth store
            login(data.data.user, data.data.accessToken);
            
            toast.success("Welcome back! Redirecting to dashboard...");
            navigate("/shop/dashboard");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
            >
                {/* Logo & Branding */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-4">
                        <img src="/mahiiindextitle.png" alt="Mahii" className="h-10 w-auto" />
                        <span className="text-3xl font-extrabold text-orange-500">Mahii</span>
                    </Link>
                    <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                        <FiShoppingBag />
                        <span>Shop Owner Portal</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Sign in to your shop
                    </h1>
                    <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
                        Manage your orders, products & customers
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl shadow-gray-100/50 dark:shadow-none p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    required
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-orange-500 transition"
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-bold text-base shadow-lg shadow-orange-500/25 transition mt-2"
                        >
                            {loading ? (
                                <>
                                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <FiArrowRight />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gray-100 dark:bg-slate-800" />
                        <span className="text-xs text-gray-400 dark:text-slate-500 font-medium">OR</span>
                        <div className="flex-1 h-px bg-gray-100 dark:bg-slate-800" />
                    </div>

                    {/* Register link */}
                    <p className="text-center text-sm text-gray-500 dark:text-slate-400">
                        Don't have a shop account?{" "}
                        <Link
                            to="/signup"
                            className="text-orange-500 hover:text-orange-600 font-semibold transition"
                        >
                            Register here
                        </Link>
                    </p>
                </div>

                {/* Back to main site */}
                <p className="text-center text-sm text-gray-400 dark:text-slate-500 mt-6">
                    Not a shop owner?{" "}
                    <Link to="/" className="text-orange-500 hover:underline font-medium">
                        Browse as customer →
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
