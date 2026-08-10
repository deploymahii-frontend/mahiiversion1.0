import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiImage,
  FiX,
  FiMapPin,
  FiSend,
  FiArrowLeft,
  FiPlus,
  FiCamera,
  FiVideo,
  FiShoppingBag,
  FiSearch,
  FiCheck,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function CreateMoment() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null); // "image" | "video"
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Product Tagging Selector State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productQuery, setProductQuery] = useState("");
  const [productResults, setProductResults] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);

  const isShopOwner =
    user?.role === "SHOP_OWNER" ||
    user?.role === "SHOPOWNER" ||
    user?.role?.name === "SHOP_OWNER";

  useEffect(() => {
    if (showProductModal) {
      searchProducts("");
    }
  }, [showProductModal]);

  const searchProducts = async (q) => {
    try {
      setLoadingProducts(true);
      const endpoint = isShopOwner ? "/products" : "/products";
      const { data } = await api.get(endpoint, { params: { search: q } });
      setProductResults(data.data || []);
    } catch (err) {
      console.error("Failed to fetch products for tagging", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      toast.error("Only image or video files are supported.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("Media file must be under 50MB.");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
    setFileType(isImage ? "image" : "video");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please add a photo or video.");
      return;
    }
    if (!caption.trim()) {
      toast.error("Please write a caption.");
      return;
    }

    try {
      setSubmitting(true);

      // 1. Upload File
      const formData = new FormData();
      formData.append("file", file);

      const endpoint = fileType === "video" ? "/uploads/video" : "/uploads/image";
      const uploadRes = await api.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const mediaUrl =
        uploadRes.data.data?.url || uploadRes.data.url || uploadRes.data.data;

      if (!mediaUrl) {
        throw new Error("Failed to upload media asset.");
      }

      // 2. Extract Hashtags
      const hashtags =
        caption
          .match(/#[\w-]+/g)
          ?.map((tag) => tag.replace(/^#/, "").toLowerCase()) || [];

      // 3. Post Moment Payload
      const momentData = {
        title: caption.trim().slice(0, 80),
        description: caption,
        mediaUrl: mediaUrl,
        mediaType: fileType,
        location: location || "",
        hashtags,
        productId: selectedProduct?._id || null,
        productIds: selectedProduct ? [selectedProduct._id] : [],
        type: isShopOwner ? "SHOP_PROMOTION" : "FOOD_REVIEW",
        status: "PUBLISHED",
      };

      await api.post("/moments", momentData);

      toast.success("Moment shared! 🎉");
      navigate("/moments");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(
        err?.response?.data?.message || "Failed to share moment. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const userName = user?.name || user?.fullName || "You";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-xs">
        <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition text-gray-700 dark:text-slate-200"
          >
            <FiArrowLeft size={22} />
          </button>
          <h1 className="font-bold text-gray-900 dark:text-white text-lg">
            Create Mahii Moment
          </h1>
          <button
            onClick={handleSubmit}
            disabled={submitting || !preview || !caption.trim()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition shadow-md shadow-orange-500/20"
          >
            {submitting ? (
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <FiSend size={14} />
            )}
            {submitting ? "Publishing..." : "Share"}
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6 space-y-5">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
            {userInitial}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-gray-900 dark:text-white">{userName}</p>
              {isShopOwner && (
                <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 text-[10px] font-bold">
                  Shop Owner
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Publishing to Mahii Social Commerce
            </p>
          </div>
        </div>

        {/* Media Upload Area */}
        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              className={`relative rounded-3xl border-2 border-dashed transition-all ${
                dragOver
                  ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                  : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              } p-10 flex flex-col items-center justify-center gap-4 cursor-pointer`}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-20 h-20 rounded-3xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center">
                <FiCamera size={36} className="text-orange-500" />
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 dark:text-white text-lg">
                  Add Photo or Video
                </p>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                  Drag & drop or tap to choose
                </p>
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-sm shadow-md shadow-orange-500/20 hover:bg-orange-600 transition"
                >
                  <FiImage size={16} /> Select File
                </button>
              </div>
              <p className="text-xs text-gray-400 dark:text-slate-500">
                Images/Videos up to 50MB
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative rounded-3xl overflow-hidden bg-black shadow-xl"
            >
              {fileType === "video" ? (
                <video
                  src={preview}
                  controls
                  className="w-full max-h-[450px] object-cover"
                />
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-[450px] object-cover"
                />
              )}
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setFileType(null);
                  setFile(null);
                }}
                className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white rounded-full p-2 hover:bg-black/80 transition"
              >
                <FiX size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {/* Caption */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-5">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption... share your experience, food story, or hashtag local spots #kolhapur #misal ✨"
            rows={4}
            maxLength={2200}
            className="w-full resize-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 bg-transparent outline-none text-sm leading-relaxed"
          />
          <p className="text-right text-xs text-gray-400 dark:text-slate-500 mt-2">
            {caption.length}/2200
          </p>
        </div>

        {/* Tagged Product Selector */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiShoppingBag className="text-orange-500" size={18} />
              <span className="font-bold text-xs text-gray-900 dark:text-white">
                Tag Product (Direct Commerce)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowProductModal(true)}
              className="px-3 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-bold text-xs hover:bg-orange-100 transition"
            >
              {selectedProduct ? "Change Product" : "+ Tag Product"}
            </button>
          </div>

          {selectedProduct ? (
            <div className="p-3 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={
                    Array.isArray(selectedProduct.images) && selectedProduct.images[0]
                      ? selectedProduct.images[0]
                      : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80"
                  }
                  alt={selectedProduct.name}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white">
                    {selectedProduct.name}
                  </h4>
                  <span className="font-extrabold text-orange-600 text-xs">
                    ₹{selectedProduct.discountedPrice || selectedProduct.price}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-red-500 p-1"
              >
                <FiX size={16} />
              </button>
            </div>
          ) : (
            <p className="text-xs text-gray-400 dark:text-slate-500">
              Link a product to enable instant "Add to Cart" directly from your Moment.
            </p>
          )}
        </div>

        {/* Location */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 px-5 py-4 flex items-center gap-3">
          <FiMapPin className="text-orange-500 flex-shrink-0" size={20} />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Add location (e.g. Rajarampuri, Kolhapur)"
            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 outline-none text-sm"
          />
        </div>
      </div>

      {/* Product Search Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                Select Product to Tag
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="relative">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={productQuery}
                onChange={(e) => {
                  setProductQuery(e.target.value);
                  searchProducts(e.target.value);
                }}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-xs text-gray-900 dark:text-white outline-none"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {loadingProducts ? (
                <p className="text-center text-xs text-gray-400 py-6">
                  Loading products...
                </p>
              ) : productResults.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-6">
                  No products found.
                </p>
              ) : (
                productResults.map((p) => (
                  <div
                    key={p._id}
                    onClick={() => {
                      setSelectedProduct(p);
                      setShowProductModal(false);
                    }}
                    className="p-3 rounded-2xl border border-gray-100 dark:border-slate-800 hover:border-orange-500 cursor-pointer flex items-center justify-between transition"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          Array.isArray(p.images) && p.images[0]
                            ? p.images[0]
                            : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80"
                        }
                        alt={p.name}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-xs text-gray-900 dark:text-white">
                          {p.name}
                        </h4>
                        <span className="font-extrabold text-orange-600 text-xs">
                          ₹{p.discountedPrice || p.price}
                        </span>
                      </div>
                    </div>
                    {selectedProduct?._id === p._id && (
                      <FiCheck size={18} className="text-orange-500" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
