import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaStore, FaUser } from "react-icons/fa";

import useSignup from "../hooks/useSignup";

export default function SignupForm() {
  const [selectedRole, setSelectedRole] = useState("customer");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const { signup, loading, error } = useSignup();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const password = watch("password", "");

  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  function passwordStrengthLabel() {
    switch (strength) {
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  }

  function onSubmit(values) {
    signup({
      ...values,
      role: selectedRole,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Account Type Selector */}
      <div>
        <label className="font-semibold text-xs text-gray-500 uppercase tracking-wider block mb-2">
          Select Account Type
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

      {/* Full Name */}
      <div>
        <label className="font-medium text-sm text-gray-700 dark:text-slate-300">
          {selectedRole === "shop_owner" ? "Business / Owner Name" : "Full Name"}
        </label>
        <input
          className="mt-1.5 w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          placeholder={selectedRole === "shop_owner" ? "Shree Krishna Organic Mart" : "John Doe"}
          {...register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="font-medium text-sm text-gray-700 dark:text-slate-300">Email Address</label>
        <input
          type="email"
          className="mt-1.5 w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          placeholder="example@email.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Mobile */}
      <div>
        <label className="font-medium text-sm text-gray-700 dark:text-slate-300">Mobile Number</label>
        <input
          type="tel"
          className="mt-1.5 w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          placeholder="9876543210"
          {...register("phone", {
            required: "Phone number is required",
            minLength: {
              value: 10,
              message: "Enter valid 10-digit mobile number",
            },
          })}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="font-medium text-sm text-gray-700 dark:text-slate-300">Password</label>
        <div className="relative mt-1.5">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 pr-12 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="Min 8 characters"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
            })}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {password && (
          <div className="mt-2">
            <div className="h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                style={{ width: `${strength * 25}%` }}
                className="bg-orange-500 h-full rounded-full transition-all duration-300"
              />
            </div>
            <p className="text-xs font-semibold text-gray-500 mt-1">
              Password Strength: {passwordStrengthLabel()}
            </p>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="font-medium text-sm text-gray-700 dark:text-slate-300">Confirm Password</label>
        <div className="relative mt-1.5">
          <input
            type={showConfirm ? "text" : "password"}
            className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 pr-12 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="Re-enter password"
            {...register("confirmPassword", {
              validate: (value) => value === password || "Passwords do not match",
            })}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Terms */}
      <label className="flex gap-3 items-start cursor-pointer pt-1">
        <input
          type="checkbox"
          className="mt-0.5 rounded text-orange-500 focus:ring-orange-500"
          {...register("terms", {
            required: true,
          })}
        />
        <span className="text-xs text-gray-600 dark:text-slate-400">
          I agree to Mahii's Terms & Conditions and Privacy Policy
        </span>
      </label>
      {errors.terms && (
        <p className="text-red-500 text-xs">Please accept Terms & Conditions</p>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-xs font-medium">
          {error}
        </div>
      )}

      <button
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3.5 font-bold text-sm shadow-md shadow-orange-500/20 transition disabled:opacity-60"
      >
        {loading
          ? "Creating Account..."
          : selectedRole === "shop_owner"
          ? "Create Shop Owner Account →"
          : "Create Customer Account →"}
      </button>

      <div className="text-center text-xs text-gray-600 dark:text-slate-400 pt-2">
        Already have an account?{" "}
        <Link className="text-orange-500 font-bold hover:underline ml-1" to="/login">
          Login
        </Link>
      </div>
    </form>
  );
}
