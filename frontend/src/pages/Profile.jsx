import React from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiShoppingBag, FiHeart, FiLogOut, FiShield } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();

  const profileData = {
    name: user?.name || user?.fullName || "User Account",
    email: user?.email || "user@mahii.in",
    phone: user?.phone || "+91 98765 43210",
    role: user?.role || "CUSTOMER",
    address: user?.address?.street || "Kolhapur, Maharashtra, India",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg">
            {profileData.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profileData.name}
              </h1>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-300">
                {profileData.role}
              </span>
            </div>

            <p className="text-sm text-gray-500 dark:text-slate-400 flex items-center justify-center md:justify-start gap-1">
              <FiMapPin /> {profileData.address}
            </p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 font-semibold text-sm transition"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-700 pb-3">
              Account Details
            </h2>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <FiUser className="text-orange-500" />
                <span className="text-gray-500 dark:text-slate-400">Full Name:</span>
                <span className="font-semibold text-gray-800 dark:text-slate-200">{profileData.name}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <FiMail className="text-orange-500" />
                <span className="text-gray-500 dark:text-slate-400">Email Address:</span>
                <span className="font-semibold text-gray-800 dark:text-slate-200">{profileData.email}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <FiPhone className="text-orange-500" />
                <span className="text-gray-500 dark:text-slate-400">Mobile Number:</span>
                <span className="font-semibold text-gray-800 dark:text-slate-200">{profileData.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <FiShield className="text-orange-500" />
                <span className="text-gray-500 dark:text-slate-400">Account Type:</span>
                <span className="font-semibold text-gray-800 dark:text-slate-200">{profileData.role}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-700 pb-3">
              Quick Shortcuts
            </h2>

            <div className="space-y-3">
              <Link
                to="/orders"
                className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-slate-700/50 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <FiShoppingBag className="text-orange-500" />
                  <span>My Orders & History</span>
                </div>
                <span>→</span>
              </Link>

              <Link
                to="/cart"
                className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-slate-700/50 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <FiHeart className="text-orange-500" />
                  <span>My Shopping Cart</span>
                </div>
                <span>→</span>
              </Link>

              {(profileData.role === "SHOP_OWNER" || profileData.role === "SHOPOWNER") && (
                <Link
                  to="/dashboard"
                  className="flex items-center justify-between p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold text-sm transition"
                >
                  <span>Go to Shop Owner Dashboard</span>
                  <span>→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
