import React, { useEffect, useState } from "react";
import {
  FiEye,
  FiHeart,
  FiMessageCircle,
  FiShoppingBag,
  FiPlus,
  FiTrendingUp,
  FiCheckCircle,
  FiDollarSign,
  FiMoreVertical,
  FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import momentService from "../../../services/moment.service";

export default function ShopOwnerMoments() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [moments, setMoments] = useState([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const res = await momentService.getOwnerAnalytics();
      if (res.data) {
        setAnalytics(res.data.totals);
        setMoments(res.data.moments || []);
      }
    } catch (err) {
      console.error("Failed to load owner moment analytics", err);
      toast.error(err?.response?.data?.message || "Failed to load moments.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    navigate("/create-moment");
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-orange-500 via-amber-500 to-pink-500 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-white/80 font-bold text-xs uppercase tracking-wider">
            <FiTrendingUp size={14} />
            <span>COMMERCE PROMOTIONS & SOCIAL ENGAGEMENT</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
            Shop Moments & Analytics 📸
          </h1>
          <p className="text-white/90 text-xs md:text-sm mt-1 max-w-xl">
            Promote your products with videos and images. Measure direct conversion from Moment views to Cart additions and Orders!
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-orange-600 font-extrabold text-sm shadow-lg hover:bg-orange-50 transition flex-shrink-0"
        >
          <FiPlus size={18} />
          <span>Create Moment</span>
        </button>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[
          {
            label: "Total Moments",
            value: analytics?.totalMoments || 0,
            icon: FiShoppingBag,
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-950/40",
          },
          {
            label: "Total Views",
            value: analytics?.totalViews || 0,
            icon: FiEye,
            color: "text-purple-500",
            bg: "bg-purple-50 dark:bg-purple-950/40",
          },
          {
            label: "Total Likes",
            value: analytics?.totalLikes || 0,
            icon: FiHeart,
            color: "text-red-500",
            bg: "bg-red-50 dark:bg-red-950/40",
          },
          {
            label: "Product Clicks",
            value: analytics?.totalProductClicks || 0,
            icon: FiShoppingBag,
            color: "text-orange-500",
            bg: "bg-orange-50 dark:bg-orange-950/40",
          },
          {
            label: "Orders Generated",
            value: analytics?.totalOrdersGenerated || 0,
            icon: FiCheckCircle,
            color: "text-green-500",
            bg: "bg-green-50 dark:bg-green-950/40",
          },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-4 rounded-3xl shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase">
                  {kpi.label}
                </span>
                <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}>
                  <Icon size={16} />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
                {kpi.value.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Moments List */}
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-bold text-gray-900 dark:text-white text-base">
          Published Moments ({moments.length})
        </h3>

        {loading ? (
          <p className="text-center text-xs text-gray-400 py-10">
            Loading moments...
          </p>
        ) : moments.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <p className="text-xs text-gray-400">
              No moments created yet for your shop.
            </p>
            <button
              onClick={handleCreate}
              className="px-5 py-2.5 rounded-2xl bg-orange-500 text-white font-bold text-xs"
            >
              + Create First Shop Moment
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {moments.map((m) => (
              <div
                key={m._id}
                className="border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden bg-gray-50/50 dark:bg-slate-800/40 p-3 space-y-3"
              >
                <div className="relative h-44 rounded-xl overflow-hidden bg-black">
                  <img
                    src={m.mediaUrl}
                    alt={m.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur text-white font-bold text-[10px] uppercase">
                    {m.status}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white line-clamp-1">
                    {m.title || m.description}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-400 mt-2">
                    <span className="flex items-center gap-1 font-semibold">
                      <FiEye size={12} /> {m.views || 0}
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <FiHeart size={12} className="text-red-500" /> {m.likes || 0}
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <FiMessageCircle size={12} /> {m.commentsCount || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
