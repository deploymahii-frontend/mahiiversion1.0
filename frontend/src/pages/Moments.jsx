import React, { useState } from "react";
import { FiHeart, FiShare2, FiMessageCircle, FiMapPin, FiTrendingUp, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const MOCK_MOMENTS = [
  {
    id: "m1",
    author: "Rohan Patil",
    shop: "Kolhapur Misal House",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
    caption: "Spiciest and most authentic Kat-Misal in town! Absolutely mind blowing morning breakfast 🔥🍲",
    likes: 142,
    comments: 18,
    time: "2 hours ago",
    location: "Rajarampuri, Kolhapur",
  },
  {
    id: "m2",
    author: "Priya Sharma",
    shop: "Shree Krishna Organic Mart",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop",
    caption: "Got my weekly fresh organic farm haul delivered in 20 minutes! Super fresh veggies 🥦🍅",
    likes: 98,
    comments: 7,
    time: "5 hours ago",
    location: "Tarabai Park, Kolhapur",
  },
  {
    id: "m3",
    author: "Amit Joshi",
    shop: "Mahalaxmi Sweets & Bakers",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop",
    caption: "Warm fresh baked Jalebi & Dhokla straight out of the kitchen! 🤤🥞",
    likes: 215,
    comments: 32,
    time: "Yesterday",
    location: "Rankala Lake, Kolhapur",
  },
  {
    id: "m4",
    author: "Snehal Kulkarni",
    shop: "Royal Fresh Dairy",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop",
    caption: "Freshest milk and paneer in Kolhapur, delivered at 6am! 🥛✨",
    likes: 76,
    comments: 5,
    time: "2 days ago",
    location: "Shivaji Park, Kolhapur",
  },
];

export default function Moments() {
  const navigate = useNavigate();
  const { authenticated } = useAuth();
  const [moments, setMoments] = useState(
    MOCK_MOMENTS.map((m) => ({ ...m, liked: false }))
  );
  const [activeComments, setActiveComments] = useState(null);

  const toggleLike = (id) => {
    setMoments((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, liked: !m.liked, likes: m.liked ? m.likes - 1 : m.likes + 1 }
          : m
      )
    );
  };

  const handleShare = (m) => {
    if (navigator.share) {
      navigator.share({ title: `Mahii Moment by ${m.author}`, text: m.caption, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
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
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm">
        <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-orange-500 font-semibold text-xs">
              <FiTrendingUp size={13} />
              <span>LIVE COMMUNITY FEED</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Mahii Moments ✨
            </h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition"
          >
            <FiPlus size={16} />
            <span>Create</span>
          </button>
        </div>
      </div>

      {/* Stories Row */}
      <div className="max-w-xl mx-auto px-4 py-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {/* Add Your Story */}
          <button
            onClick={handleCreate}
            className="flex flex-col items-center gap-1.5 flex-shrink-0"
          >
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-orange-400 flex items-center justify-center bg-orange-50 dark:bg-orange-950/30 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition">
              <FiPlus size={24} className="text-orange-500" />
            </div>
            <span className="text-[10px] text-gray-600 dark:text-slate-400 font-semibold w-16 text-center leading-tight">Your Moment</span>
          </button>

          {/* Story Bubbles */}
          {MOCK_MOMENTS.map((m) => (
            <button key={m.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-orange-500 via-amber-400 to-pink-500 shadow-md">
                <img
                  src={m.avatar}
                  alt={m.author}
                  className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-900"
                />
              </div>
              <span className="text-[10px] text-gray-600 dark:text-slate-400 font-semibold w-16 text-center truncate leading-tight">
                {m.author.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Feed Posts */}
      <div className="max-w-xl mx-auto px-4 space-y-6">
        {moments.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm"
          >
            {/* Post Header */}
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-0.5 rounded-full bg-gradient-to-tr from-orange-500 via-amber-400 to-pink-500">
                  <img
                    src={m.avatar}
                    alt={m.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-900"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{m.author}</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-slate-500">
                    <span className="text-orange-500 font-semibold">{m.shop}</span>
                    <span>•</span>
                    <FiMapPin size={10} />
                    <span>{m.location}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-400 dark:text-slate-500">{m.time}</span>
            </div>

            {/* Post Image */}
            <div className="relative">
              <img
                src={m.image}
                alt={m.caption}
                className="w-full h-72 sm:h-96 object-cover"
                onDoubleClick={() => toggleLike(m.id)}
              />
              <AnimatePresence>
                {m.liked && (
                  <motion.div
                    key="heart"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.3 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <FiHeart size={80} className="text-white drop-shadow-lg fill-current" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="px-5 pt-4 pb-2 flex items-center gap-5">
              <motion.button
                whileTap={{ scale: 1.3 }}
                onClick={() => toggleLike(m.id)}
                className={`flex items-center gap-1.5 font-semibold text-sm transition ${
                  m.liked ? "text-red-500" : "text-gray-600 dark:text-slate-300 hover:text-red-500"
                }`}
              >
                <FiHeart
                  size={22}
                  className={m.liked ? "fill-current" : ""}
                />
                <span>{m.likes}</span>
              </motion.button>

              <button
                onClick={() => setActiveComments(activeComments === m.id ? null : m.id)}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-slate-300 hover:text-blue-500 transition"
              >
                <FiMessageCircle size={22} />
                <span>{m.comments}</span>
              </button>

              <button
                onClick={() => handleShare(m)}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-slate-300 hover:text-green-500 transition"
              >
                <FiShare2 size={20} />
              </button>
            </div>

            {/* Caption */}
            <div className="px-5 pb-5">
              <p className="text-sm text-gray-800 dark:text-slate-200 leading-relaxed">
                <span className="font-bold text-gray-900 dark:text-white mr-1">{m.author.split(" ")[0]}</span>
                {m.caption}
              </p>

              {/* Comments Preview */}
              <AnimatePresence>
                {activeComments === m.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800 space-y-2"
                  >
                    <p className="text-xs text-gray-400 dark:text-slate-500">Comments coming soon...</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                        {(authenticated ? "Y" : "?")}
                      </div>
                      <input
                        type="text"
                        placeholder={authenticated ? "Add a comment..." : "Log in to comment"}
                        disabled={!authenticated}
                        onClick={() => !authenticated && navigate("/login")}
                        className="flex-1 text-xs bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 outline-none focus:ring-1 focus:ring-orange-500 transition disabled:opacity-60 cursor-pointer"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Create Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCreate}
        className="fixed bottom-24 right-5 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-xl shadow-orange-500/30 transition"
      >
        <FiPlus size={20} />
        <span className="text-sm">Create</span>
      </motion.button>
    </div>
  );
}
