import React, { useEffect, useState } from "react";
import { FiHeart, FiBookmark, FiShare2, FiMessageCircle, FiMapPin, FiTrendingUp, FiPlus, FiUserPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../services/api";

export default function Moments() {
  const navigate = useNavigate();
  const { authenticated } = useAuth();
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeComments, setActiveComments] = useState(null);
  const [commentDrafts, setCommentDrafts] = useState({});

  useEffect(() => {
    const loadMoments = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/moments/feed");
        const normalized = (data?.data || []).map((moment) => {
          let imageUrl = moment.mediaUrl;
          const baseUrl = api.defaults.baseURL.replace("/api/v1", "");
          if (imageUrl) {
            imageUrl = imageUrl.replace(/\\/g, "/");
            if (imageUrl.startsWith("uploads/")) {
              imageUrl = `/${imageUrl}`;
            }

            if (imageUrl.startsWith("http://localhost:5000")) {
              imageUrl = imageUrl.replace("http://localhost:5000", baseUrl);
            } else if (imageUrl.startsWith("/uploads")) {
              imageUrl = `${baseUrl}${imageUrl}`;
            }
          }

          return {
            id: moment._id,
            author: moment.creator?.fullName || "Mahii user",
            avatar: moment.creator?.profileImage || "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
            shop: moment.shop?.name || "Mahii Shop",
            location: moment.location || "Nearby",
            time: new Date(moment.createdAt).toLocaleDateString(),
            image: imageUrl,
            caption: moment.description || moment.title,
            likes: moment.likes || 0,
            comments: 0,
            liked: false,
            saved: false,
            following: false,
            mediaType: moment.mediaType || "image",
          };
        });
        setMoments(normalized);
      } catch (error) {
        console.error("Failed to load moments", error);
      } finally {
        setLoading(false);
      }
    };

    loadMoments();
  }, []);

  const toggleLike = async (id) => {
    const selected = moments.find((moment) => moment.id === id);
    if (!selected) return;

    try {
      const { data } = await api.post(`/moments/${id}/like`);
      setMoments((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, liked: data?.data?.liked ?? !m.liked, likes: data?.data?.likes ?? (m.liked ? m.likes - 1 : m.likes + 1) }
            : m
        )
      );
    } catch (error) {
      toast.error("Unable to update like state right now.");
    }
  };

  const toggleSave = async (id) => {
    try {
      const { data } = await api.post(`/moments/${id}/save`);
      setMoments((prev) =>
        prev.map((m) => (m.id === id ? { ...m, saved: data?.data?.saved ?? !m.saved } : m))
      );
      toast.success(data?.data?.saved ? "Moment saved." : "Saved removed.");
    } catch (error) {
      toast.error("Unable to save moment right now.");
    }
  };

  const toggleFollow = async (id) => {
    try {
      const { data } = await api.post(`/moments/${id}/follow`);
      setMoments((prev) =>
        prev.map((m) => (m.id === id ? { ...m, following: data?.data?.following ?? !m.following } : m))
      );
      toast.success(data?.data?.following ? "Following shop updates." : "Follow removed.");
    } catch (error) {
      toast.error("Unable to update follow state right now.");
    }
  };

  const submitComment = async (id) => {
    const value = (commentDrafts[id] || "").trim();
    if (!value) return;

    try {
      const { data } = await api.post(`/moments/${id}/comment`, { value });
      setMoments((prev) =>
        prev.map((m) => (m.id === id ? { ...m, comments: m.comments + 1 } : m))
      );
      setCommentDrafts((prev) => ({ ...prev, [id]: "" }));
      toast.success("Comment added.");
      if (data?.data) {
        setActiveComments(id);
      }
    } catch (error) {
      toast.error("Unable to post comment right now.");
    }
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
            className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition"
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

          {/* Story bubbles will appear when community Moments are available. */}
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span>No Moments yet.</span>
            <span>Share the first one above.</span>
          </div>
        </div>
      </div>

      {/* Feed Posts */}
      <div className="max-w-xl mx-auto px-4 space-y-6">
        {loading ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Loading live moments...
          </div>
        ) : moments.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No moments yet. Share the first one above.
          </div>
        ) : null}

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
              {m.mediaType === "video" ? (
                <video
                  src={m.image}
                  controls
                  className="w-full h-72 sm:h-96 object-cover"
                  onDoubleClick={() => toggleLike(m.id)}
                />
              ) : (
                <img
                  src={m.image}
                  alt={m.caption}
                  className="w-full h-72 sm:h-96 object-cover"
                  onDoubleClick={() => toggleLike(m.id)}
                />
              )}
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
                onClick={() => toggleSave(m.id)}
                className={`flex items-center gap-1.5 text-sm font-semibold transition ${
                  m.saved ? "text-orange-500" : "text-gray-600 dark:text-slate-300 hover:text-orange-500"
                }`}
              >
                <FiBookmark size={20} />
              </button>

              <button
                onClick={() => toggleFollow(m.id)}
                className={`flex items-center gap-1.5 text-sm font-semibold transition ${
                  m.following ? "text-blue-500" : "text-gray-600 dark:text-slate-300 hover:text-blue-500"
                }`}
              >
                <FiUserPlus size={20} />
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
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                        {(authenticated ? "Y" : "?")}
                      </div>
                      <input
                        type="text"
                        value={commentDrafts[m.id] || ""}
                        onChange={(e) => setCommentDrafts((prev) => ({ ...prev, [m.id]: e.target.value }))}
                        placeholder={authenticated ? "Add a comment..." : "Log in to comment"}
                        disabled={!authenticated}
                        onClick={() => !authenticated && navigate("/login")}
                        className="flex-1 text-xs bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 outline-none focus:ring-1 focus:ring-orange-500 transition disabled:opacity-60"
                      />
                      <button
                        onClick={() => submitComment(m.id)}
                        disabled={!authenticated || !(commentDrafts[m.id] || "").trim()}
                        className="rounded-xl bg-orange-500 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                      >
                        Post
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>


    </div>
  );
}
