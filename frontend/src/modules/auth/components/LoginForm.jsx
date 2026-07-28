import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUser, FaStore } from "react-icons/fa";

import useLogin from "../hooks/useLogin";

export default function LoginForm() {
  const [selectedRole, setSelectedRole] = useState("customer");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const { login, loading, error } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(values) {
    login({
      ...values,
      role: selectedRole,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Account Type Selector */}
      <div>
        <label className="font-semibold text-xs text-gray-500 uppercase tracking-wider block mb-2">
          Login As
        </label>
        <div className="bg-gray-100 dark:bg-slate-800 p-1.5 rounded-2xl flex items-center gap-1.5 border border-gray-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setSelectedRole("customer")}
            className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
              selectedRole === "customer"
                ? "bg-white dark:bg-slate-900 text-orange-600 shadow-sm border border-gray-100 dark:border-slate-800"
                : "text-gray-600 dark:text-slate-400 hover:text-gray-900"
            }`}
          >
            <FaUser />
            <span>Customer</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole("shop_owner")}
            className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
              selectedRole === "shop_owner"
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                : "text-gray-600 dark:text-slate-400 hover:text-gray-900"
            }`}
          >
            <FaStore />
            <span>Shop Owner</span>
          </button>
        </div>
      </div>

      {/* Email or Phone */}
      <div>
        <label className="font-medium text-sm text-gray-700 dark:text-slate-300">
          Email or Mobile Number
        </label>
        <input
          type="text"
          placeholder={selectedRole === "shop_owner" ? "Shop owner email or mobile" : "Customer email or mobile"}
          className="mt-1.5 w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          {...register("identifier", {
            required: "Email or Mobile number is required",
          })}
        />
        {errors.identifier && (
          <p className="mt-1 text-xs text-red-600">{errors.identifier.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="font-medium text-sm text-gray-700 dark:text-slate-300">Password</label>
        <div className="relative mt-1.5">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 pr-12 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-slate-400">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500" {...register("rememberMe")} />
          <span>Remember Me</span>
        </label>
        <Link to="/forgot-password" className="text-orange-500 font-semibold hover:underline">
          Forgot Password?
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-orange-500 py-3.5 font-bold text-sm text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600 disabled:opacity-60"
      >
        {loading
          ? "Signing In..."
          : selectedRole === "shop_owner"
          ? "Login to Shop Portal →"
          : "Login to Account →"}
      </button>

      {/* Footer Switcher */}
      <div className="text-center text-xs text-gray-600 dark:text-slate-400 pt-2">
        Don't have an account?{" "}
        <Link to="/signup" className="font-bold text-orange-500 hover:underline ml-1">
          Create Account
        </Link>
      </div>
    </form>
  );
}
