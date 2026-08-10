import React, { useState, useEffect } from "react";
import {
  FiHeart,
  FiBookmark,
  FiShare2,
  FiMessageCircle,
  FiMapPin,
  FiShoppingCart,
  FiCheck,
  FiAlertCircle,
  FiMoreVertical,
  FiFlag,
  FiExternalLink,
  FiSend,
  FiTrash2,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useCart from "../../hooks/useCart";
import toast from "react-hot-toast";
import momentService from "../../services/moment.service";
import ReportModal from "../shop/ReportModal";

export default function MomentCard({ moment, onUpdate }) {
  const navigate = useNavigate();
  const { user, authenticated } = useAuth();
  const { addToCart } = useCart();

  const [liked, setLiked] = useState(moment.liked || false);
  const [likesCount, setLikesCount] = useState(moment.likes || 0);
  const [saved, setSaved] = useState(moment.saved || false);
  const [commentsCount, setCommentsCount] = useState(
    moment.commentsCount || moment.comments || 0
  );
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [addingCart, setAddingCart] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  // Normalize image media URL
  let mediaUrl = moment.mediaUrl || moment.image || "";
  if (mediaUrl && !mediaUrl.startsWith("http") && !mediaUrl.startsWith("blob")) {
    const cleanPath = mediaUrl.replace(/\\/g, "/").replace(/^\/?/, "");
    mediaUrl = `http://localhost:5000/${cleanPath}`;
  }

  const creatorName =
    moment.creator?.fullName ||
    moment.creator?.name ||
    moment.author ||
    "Mahii user";

  const creatorAvatar =
    moment.creator?.profileImage ||
    moment.avatar ||
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80";

  const shopObj = moment.shop || null;
  const shopName = shopObj?.name || moment.shopName || "Local Partner";
  const shopSlug = shopObj?.slug || shopObj?._id;

  // Tagged Product
  const productObj =
    moment.productId ||
    (Array.isArray(moment.productIds) && moment.productIds[0]) ||
    null;

  const isShopOwnerCreator =
    moment.creatorType === "SHOP_OWNER" || moment.type === "SHOP_PROMOTION";

  // Track view on mount
  useEffect(() => {
    if (moment._id || moment.id) {
      momentService.trackView(moment._id || moment.id);
    }
  }, [moment._id, moment.id]);

  const handleLike = async () => {
    if (!authenticated) {
      toast("Please log in to like moments ❤️", { icon: "🔒" });
      navigate("/login");
      return;
    }

    const nextState = !liked;
    setLiked(nextState);
    setLikesCount((prev) => (nextState ? prev + 1 : prev - 1));
    if (nextState) {
      setHeartAnim(true);
      setTimeout(() => setHeartAnim(false), 1000);
    }

    try {
      const res = await momentService.toggleLike(moment._id || moment.id);
      if (res?.data) {
        setLiked(res.data.liked);
        setLikesCount(res.data.likes);
      }
    } catch (err) {
      setLiked(!nextState);
      setLikesCount((prev) => (nextState ? prev - 1 : prev + 1));
      toast.error("Unable to update like right now.");
    }
  };

  const handleDoubleTap = () => {
    if (!liked) {
      handleLike();
    } else {
      setHeartAnim(true);
      setTimeout(() => setHeartAnim(false), 1000);
    }
  };

  const handleSave = async () => {
    if (!authenticated) {
      toast("Please log in to save moments 🔖", { icon: "🔒" });
      navigate("/login");
      return;
    }

    const nextState = !saved;
    setSaved(nextState);
    toast.success(nextState ? "Moment saved to your profile." : "Saved moment removed.");

    try {
      const res = await momentService.toggleSave(moment._id || moment.id);
      if (res?.data) {
        setSaved(res.data.saved);
      }
    } catch (err) {
      setSaved(!nextState);
      toast.error("Unable to save right now.");
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/moments?id=${moment._id || moment.id}`;
    if (navigator.share) {
      navigator.share({
        title: `Mahii Moment: ${creatorName}`,
        text: moment.description || moment.title || "Check out this local moment on Mahii!",
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard! 📋");
    }
  };

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const res = await momentService.getComments(moment._id || moment.id);
      setCommentsList(res.data || []);
    } catch (err) {
      toast.error("Failed to load comments.");
    } finally {
      setLoadingComments(false);
    }
  };

  const toggleCommentsDrawer = () => {
    const nextState = !showComments;
    setShowComments(nextState);
    if (nextState) {
      fetchComments();
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!authenticated) {
      toast("Please log in to comment", { icon: "🔒" });
      navigate("/login");
      return;
    }

    if (!commentText.trim()) return;

    try {
      const res = await momentService.postComment(moment._id || moment.id, {
        text: commentText.trim(),
      });

      if (res.data) {
        setCommentsList((prev) => [res.data, ...prev]);
        setCommentsCount((prev) => prev + 1);
        setCommentText("");
        toast.success("Comment posted!");
      }
    } catch (err) {
      toast.error("Failed to post comment.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await momentService.deleteComment(commentId);
      setCommentsList((prev) => prev.filter((c) => c._id !== commentId));
      setCommentsCount((prev) => Math.max(0, prev - 1));
      toast.success("Comment deleted.");
    } catch (err) {
      toast.error("Failed to delete comment.");
    }
  };

  const handleAddToCart = async (product) => {
    if (!product || !product.available) {
      toast.error("This product is currently unavailable.");
      return;
    }

    try {
      setAddingCart(true);
      await addToCart(product, 1);
      momentService.trackCartAddition(moment._id || moment.id);
      setCartSuccess(true);
      toast.success(`Added ${product.name} to cart! 🛒`);
      setTimeout(() => setCartSuccess(false), 2000);
    } catch (err) {
      toast.error(err?.message || "Failed to add to cart.");
    } finally {
      setAddingCart(false);
    }
  };

  const handleShopClick = () => {
    momentService.trackShopClick(moment._id || moment.id);
    if (shopSlug) {
      navigate(`/shop/${shopSlug}`);
    }
  };

  const handleProductClick = (product) => {
    momentService.trackProductClick(moment._id || moment.id);
    navigate(`/product/${product._id || product.id}`);
  };

  const handleReportSubmit = async (reason, details) => {
    try {
      await momentService.reportMoment(moment._id || moment.id, { reason, details });
      toast.success("Thank you. This moment has been reported for admin review.");
      setShowReportModal(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Already reported or failed to submit.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* 1. Header */}
      <div className="px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-orange-500 via-amber-400 to-pink-500">
            <img
              src={creatorAvatar}
              alt={creatorName}
              className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-900"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                {creatorName}
              </h3>
              {isShopOwnerCreator && (
                <span className="px-1.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold text-[10px] uppercase tracking-wider">
                  Partner Shop
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-slate-400">
              {shopObj && (
                <button
                  onClick={handleShopClick}
                  className="text-orange-500 hover:underline font-semibold flex items-center gap-0.5"
                >
                  {shopName}
                </button>
              )}
              {moment.location && (
                <>
                  <span>•</span>
                  <FiMapPin size={10} className="text-orange-500" />
                  <span>{moment.location}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Options Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          >
            <FiMoreVertical size={18} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-xl z-20 py-1 text-xs">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowReportModal(true);
                }}
                className="w-full px-4 py-2.5 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 font-medium"
              >
                <FiFlag size={14} /> Report Moment
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Media Area */}
      <div className="relative bg-black group select-none cursor-pointer" onDoubleClick={handleDoubleTap}>
        {moment.mediaType === "video" ? (
          <video
            src={mediaUrl}
            controls
            playsInline
            className="w-full h-80 sm:h-[420px] object-cover"
          />
        ) : (
          <img
            src={mediaUrl}
            alt={moment.caption || moment.title}
            className="w-full h-80 sm:h-[420px] object-cover"
          />
        )}

        {/* Floating Heart Double Tap Animation */}
        <AnimatePresence>
          {heartAnim && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            >
              <FiHeart size={90} className="text-red-500 fill-current drop-shadow-2xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Action Bar */}
      <div className="px-5 pt-3.5 pb-2 flex items-center justify-between border-b border-gray-50 dark:border-slate-800/60">
        <div className="flex items-center gap-5">
          <motion.button
            whileTap={{ scale: 1.25 }}
            onClick={handleLike}
            className={`flex items-center gap-1.5 font-bold text-sm transition ${
              liked ? "text-red-500" : "text-gray-700 dark:text-slate-200 hover:text-red-500"
            }`}
          >
            <FiHeart size={22} className={liked ? "fill-current" : ""} />
            <span>{likesCount}</span>
          </motion.button>

          <button
            onClick={toggleCommentsDrawer}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-slate-200 hover:text-blue-500 transition"
          >
            <FiMessageCircle size={22} />
            <span>{commentsCount}</span>
          </button>

          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 text-sm font-semibold transition ${
              saved ? "text-orange-500" : "text-gray-700 dark:text-slate-200 hover:text-orange-500"
            }`}
          >
            <FiBookmark size={21} className={saved ? "fill-current" : ""} />
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-slate-200 hover:text-green-500 transition"
          >
            <FiShare2 size={20} />
          </button>
        </div>

        {shopObj && (
          <button
            onClick={handleShopClick}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/50 font-bold text-xs transition"
          >
            <span>Visit Shop</span>
            <FiExternalLink size={12} />
          </button>
        )}
      </div>

      {/* 4. Caption & Hashtags */}
      <div className="px-5 py-3 space-y-1.5">
        <p className="text-sm text-gray-800 dark:text-slate-200 leading-relaxed">
          <span className="font-bold text-gray-900 dark:text-white mr-1.5">{creatorName.split(" ")[0]}</span>
          {moment.description || moment.caption || moment.title}
        </p>

        {Array.isArray(moment.hashtags) && moment.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {moment.hashtags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 5. Direct Commerce: Tagged Product Banner */}
      {productObj && (
        <div className="mx-5 mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-200 dark:border-orange-900/40 flex items-center justify-between gap-3 shadow-sm">
          <div
            onClick={() => handleProductClick(productObj)}
            className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-gray-200 dark:border-slate-700">
              <img
                src={
                  Array.isArray(productObj.images) && productObj.images[0]
                    ? productObj.images[0]
                    : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80"
                }
                alt={productObj.name}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                  Featured Item
                </span>
                {!productObj.available && (
                  <span className="text-[9px] font-bold text-red-500 bg-red-50 dark:bg-red-950/60 px-1.5 py-0.5 rounded">
                    Sold Out
                  </span>
                )}
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white text-xs truncate group-hover:text-orange-500 transition">
                {productObj.name}
              </h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-extrabold text-orange-600 dark:text-orange-400 text-xs">
                  ₹{productObj.discountedPrice || productObj.price}
                </span>
                {productObj.discountedPrice && (
                  <span className="text-[10px] text-gray-400 line-through">
                    ₹{productObj.price}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleAddToCart(productObj)}
            disabled={addingCart || !productObj.available}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition ${
              cartSuccess
                ? "bg-green-500 text-white shadow-green-500/20"
                : productObj.available
                ? "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20"
                : "bg-gray-200 dark:bg-slate-800 text-gray-400 cursor-not-allowed"
            }`}
          >
            {cartSuccess ? (
              <>
                <FiCheck size={14} /> Added
              </>
            ) : (
              <>
                <FiShoppingCart size={14} /> Add to Cart
              </>
            )}
          </button>
        </div>
      )}

      {/* 6. Comments Drawer */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 py-4 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                Comments ({commentsList.length})
              </h4>
            </div>

            {/* Comment Form */}
            <form onSubmit={handlePostComment} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={authenticated ? "Add a comment..." : "Log in to join the discussion"}
                disabled={!authenticated}
                className="flex-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-orange-500 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!authenticated || !commentText.trim()}
                className="px-3 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 disabled:opacity-50 transition"
              >
                <FiSend size={14} />
              </button>
            </form>

            {/* Comments List */}
            {loadingComments ? (
              <p className="text-center text-xs text-gray-400 py-3">Loading comments...</p>
            ) : commentsList.length === 0 ? (
              <p className="text-center text-xs text-gray-400 py-3">No comments yet. Be the first!</p>
            ) : (
              <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                {commentsList.map((c) => (
                  <div
                    key={c._id}
                    className="flex items-start justify-between bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-gray-100 dark:border-slate-700/60"
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <img
                        src={
                          c.user?.profileImage ||
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
                        }
                        alt="User"
                        className="w-6 h-6 rounded-full object-cover mt-0.5"
                      />
                      <div className="min-w-0 text-xs">
                        <span className="font-bold text-gray-900 dark:text-white mr-1.5">
                          {c.user?.fullName || c.user?.name || "User"}
                        </span>
                        <span className="text-gray-700 dark:text-slate-300 leading-snug">
                          {c.text}
                        </span>
                      </div>
                    </div>
                    {user?._id === (c.user?._id || c.user) && (
                      <button
                        onClick={() => handleDeleteComment(c._id)}
                        className="text-gray-400 hover:text-red-500 transition p-1"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReportSubmit}
        />
      )}
    </motion.div>
  );
}
