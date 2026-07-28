import React, { useState } from "react";
import { FiHeart, FiShare2, FiMessageCircle, FiMapPin, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";

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
];

export default function Moments() {
  const [moments, setMoments] = useState(MOCK_MOMENTS);

  const toggleLike = (id) => {
    setMoments((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, liked: !m.liked, likes: m.liked ? m.likes - 1 : m.likes + 1 } : m
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div>
            <div className="flex items-center gap-2 text-orange-500 font-semibold text-sm">
              <FiTrendingUp />
              <span>Local Community Feed</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
              Mahii Moments ✨
            </h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
              See live reviews, food stories, and experiences shared by neighbors around you!
            </p>
          </div>
        </div>

        {moments.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-gray-100 dark:border-slate-700 overflow-hidden"
          >
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={m.avatar}
                  alt={m.author}
                  className="w-11 h-11 rounded-full object-cover border-2 border-orange-500"
                />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{m.author}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
                    <span className="text-orange-600 font-semibold">{m.shop}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FiMapPin size={12} /> {m.location}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-400">{m.time}</span>
            </div>

            <img src={m.image} alt={m.caption} className="w-full h-80 object-cover" />

            <div className="p-5">
              <p className="text-gray-800 dark:text-slate-200 text-sm leading-relaxed">
                {m.caption}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between text-gray-600 dark:text-slate-300">
                <button
                  onClick={() => toggleLike(m.id)}
                  className={`flex items-center gap-2 text-sm font-medium transition ${
                    m.liked ? "text-red-500" : "hover:text-red-500"
                  }`}
                >
                  <FiHeart className={m.liked ? "fill-current" : ""} size={18} />
                  <span>{m.likes} Likes</span>
                </button>

                <button className="flex items-center gap-2 text-sm font-medium hover:text-blue-500 transition">
                  <FiMessageCircle size={18} />
                  <span>{m.comments} Comments</span>
                </button>

                <button className="flex items-center gap-2 text-sm font-medium hover:text-green-500 transition">
                  <FiShare2 size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
