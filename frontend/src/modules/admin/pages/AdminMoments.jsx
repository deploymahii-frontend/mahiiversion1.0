import React, { useEffect, useState } from "react";
import {
  FiShield,
  FiAlertTriangle,
  FiCheckCircle,
  FiEyeOff,
  FiTrash2,
  FiStar,
  FiFilter,
} from "react-icons/fi";
import toast from "react-hot-toast";
import momentService from "../../../services/moment.service";

export default function AdminMoments() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMoments();
  }, [activeFilter]);

  const loadMoments = async () => {
    try {
      setLoading(true);
      const statusParam = activeFilter === "ALL" ? "" : activeFilter;
      const res = await momentService.adminGetMoments({ status: statusParam });
      setMoments(res.data?.moments || []);
    } catch (err) {
      console.error("Failed to load admin moments", err);
      toast.error("Failed to load moments for moderation.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await momentService.adminUpdateStatus(id, status);
      toast.success(`Moment status updated to ${status}`);
      loadMoments();
    } catch (err) {
      toast.error("Failed to update moment status.");
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await momentService.adminToggleFeatured(id);
      toast.success("Featured status toggled!");
      loadMoments();
    } catch (err) {
      toast.error("Failed to toggle featured status.");
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider">
            <FiShield size={14} />
            <span>ADMINISTRATIVE CONTENT MODERATION</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
            Mahii Moment Moderation Queue 🛡️
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Inspect reported, hidden, or published community and shop owner moments. Apply moderation rules or feature top moments.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-slate-800 pb-3">
        {["ALL", "REPORTED", "PUBLISHED", "HIDDEN", "REMOVED"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveFilter(status)}
            className={`px-4 py-2 rounded-2xl font-extrabold text-xs transition ${
              activeFilter === status
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table / Cards List */}
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        {loading ? (
          <p className="text-center text-xs text-gray-400 py-12">
            Loading moderation queue...
          </p>
        ) : moments.length === 0 ? (
          <p className="text-center text-xs text-gray-400 py-12">
            No moments found matching filter "{activeFilter}".
          </p>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-slate-800">
            {moments.map((m) => (
              <div
                key={m._id}
                className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={m.mediaUrl}
                    alt={m.title}
                    className="w-16 h-16 rounded-2xl object-cover border border-gray-200 dark:border-slate-700 flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-gray-900 dark:text-white">
                        {m.creator?.fullName || m.creator?.name || "User"}
                      </span>
                      {m.creatorType === "SHOP_OWNER" && (
                        <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 text-[10px] font-bold">
                          Shop Owner
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          m.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400"
                            : m.status === "REPORTED"
                            ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400"
                            : "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-slate-300 line-clamp-1">
                      {m.description || m.title}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400">
                      <span>Likes: {m.likes || 0}</span>
                      <span>Views: {m.views || 0}</span>
                      <span>Shop: {m.shop?.name || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Moderation Actions */}
                <div className="flex items-center gap-2 flex-wrap self-end md:self-center">
                  <button
                    onClick={() => handleToggleFeatured(m._id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition ${
                      m.isFeatured
                        ? "bg-amber-500 text-white"
                        : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-amber-100"
                    }`}
                  >
                    <FiStar size={12} />
                    {m.isFeatured ? "Featured" : "Feature"}
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(m._id, "PUBLISHED")}
                    className="px-3 py-1.5 rounded-xl bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 hover:bg-green-100 font-bold text-xs flex items-center gap-1 transition"
                  >
                    <FiCheckCircle size={12} /> Approve
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(m._id, "HIDDEN")}
                    className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 font-bold text-xs flex items-center gap-1 transition"
                  >
                    <FiEyeOff size={12} /> Hide
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(m._id, "REMOVED")}
                    className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 font-bold text-xs flex items-center gap-1 transition"
                  >
                    <FiTrash2 size={12} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
