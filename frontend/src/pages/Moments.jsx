import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiTrendingUp,
  FiPlus,
  FiCompass,
  FiUsers,
  FiMapPin,
  FiX,
  FiEye,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import momentService from "../services/moment.service";
import MomentCard from "../components/moments/MomentCard";

export default function Moments() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { authenticated, user } = useAuth();

  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "for_you"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [moments, setMoments] = useState([]);
  const [stories, setStories] = useState([]);
  const [activeStoryModal, setActiveStoryModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Load feed when tab, searchQuery, or page changes
  useEffect(() => {
    loadFeed();
  }, [activeTab, searchQuery, page]);

  // Load stories on mount
  useEffect(() => {
    loadStories();
  }, []);

  const loadFeed = async () => {
    try {
      setLoading(true);
      const res = await momentService.getFeed({
        type: activeTab,
        search: searchQuery,
        page,
        limit: 10,
      });

      const list = res.data || [];
      if (page === 1) {
        setMoments(list);
      } else {
        setMoments((prev) => [...prev, ...list]);
      }

      setHasMore(page < (res.meta?.totalPages || 1));
    } catch (error) {
      console.error("Failed to load feed", error);
      toast.error("Failed to load moments feed.");
    } finally {
      setLoading(false);
    }
  };

  const loadStories = async () => {
    try {
      const res = await momentService.getStories();
      setStories(res.data || []);
    } catch (error) {
      console.error("Failed to load stories", error);
    }
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setPage(1);
    setSearchParams({ tab: tabKey });
  };

  const handleCreate = () => {
    if (!authenticated) {
      toast("Please log in to share a Moment 📸", { icon: "🔒" });
      navigate("/login?redirect=/create-moment");
      return;
    }
    navigate("/create-moment");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-28">
      {/* 1. Header & Search Bar */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-xs">
        <div className="max-w-xl mx-auto px-4 py-3 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-orange-500 font-bold text-[11px] uppercase tracking-wider">
                <FiTrendingUp size={13} />
                <span>LOCAL SOCIAL COMMERCE</span>
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Mahii Moments ✨
              </h1>
            </div>
            <button
              onClick={handleCreate}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition"
            >
              <FiPlus size={16} />
              <span>Create</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <FiSearch
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search moments, shops, #food, #kolhapur..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-slate-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>
        </div>

        {/* 2. Four Main Feeds Switcher */}
        <div className="max-w-xl mx-auto px-4 flex border-t border-gray-100 dark:border-slate-800/80">
          {[
            { id: "for_you", label: "For You", icon: FiCompass },
            { id: "following", label: "Following", icon: FiUsers },
            { id: "nearby", label: "Nearby", icon: FiMapPin },
            { id: "trending", label: "Trending", icon: FiTrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 py-3 flex items-center justify-center gap-1.5 text-xs font-extrabold border-b-2 transition ${
                  isActive
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Stories Horizontal Reel */}
      <div className="max-w-xl mx-auto px-4 py-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide items-center">
          {/* Add Your Story Button */}
          <button
            onClick={handleCreate}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
          >
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-orange-400 flex items-center justify-center bg-orange-50 dark:bg-orange-950/30 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/40 transition shadow-xs">
              <FiPlus size={24} className="text-orange-500" />
            </div>
            <span className="text-[10px] font-bold text-gray-700 dark:text-slate-300 w-16 text-center leading-tight">
              Add Story
            </span>
          </button>

          {/* Stories List */}
          {stories.map((story) => (
            <button
              key={story._id}
              onClick={() => setActiveStoryModal(story)}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
            >
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-orange-500 via-amber-400 to-pink-500">
                <img
                  src={
                    story.shop?.logo ||
                    story.creator?.profileImage ||
                    story.mediaUrl ||
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
                  }
                  alt={story.caption || "Story"}
                  className="w-15 h-15 rounded-full object-cover border-2 border-white dark:border-slate-900 group-hover:scale-105 transition"
                />
              </div>
              <span className="text-[10px] font-semibold text-gray-800 dark:text-slate-200 w-16 text-center truncate">
                {story.shop?.name || story.creator?.fullName || "User"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Feed Posts List */}
      <div className="max-w-xl mx-auto px-4 space-y-6">
        {loading && page === 1 ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-96 rounded-3xl bg-gray-200 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : moments.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center mx-auto">
              <FiCompass size={28} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              No moments in this feed yet
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 max-w-sm mx-auto">
              {activeTab === "following"
                ? "Follow local partner shops and food creators to see their latest moments here."
                : "Be the first to share your food experience or shop update!"}
            </p>
            <button
              onClick={handleCreate}
              className="mt-2 px-5 py-2.5 rounded-2xl bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-500/20"
            >
              Share First Moment ✨
            </button>
          </div>
        ) : (
          moments.map((moment) => (
            <MomentCard
              key={moment._id || moment.id}
              moment={moment}
              onUpdate={loadFeed}
            />
          ))
        )}

        {/* Load More Button */}
        {!loading && hasMore && moments.length > 0 && (
          <div className="text-center pt-4">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 font-bold text-xs text-gray-700 dark:text-slate-200 hover:border-orange-500 transition shadow-xs"
            >
              Load More Moments
            </button>
          </div>
        )}
      </div>

      {/* 5. 24-Hour Story Modal Viewer */}
      {activeStoryModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActiveStoryModal(null)}
            className="absolute top-5 right-5 p-3 text-white rounded-full bg-black/50 hover:bg-black/80 transition"
          >
            <FiX size={24} />
          </button>
          <div className="max-w-md w-full rounded-3xl overflow-hidden bg-slate-900 shadow-2xl">
            <div className="relative">
              <img
                src={activeStoryModal.mediaUrl}
                alt="Story"
                className="w-full max-h-[500px] object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full text-white text-xs font-bold">
                <img
                  src={
                    activeStoryModal.shop?.logo ||
                    activeStoryModal.creator?.profileImage ||
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80"
                  }
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span>{activeStoryModal.shop?.name || activeStoryModal.creator?.fullName}</span>
              </div>
            </div>
            {activeStoryModal.caption && (
              <p className="p-4 text-white text-xs leading-relaxed text-center font-medium">
                {activeStoryModal.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
