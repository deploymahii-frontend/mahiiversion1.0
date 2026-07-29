import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiImage, FiVideo, FiX, FiMapPin, FiSend, 
  FiArrowLeft, FiPlus, FiCamera
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function CreateMoment() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null); // "image" | "video"
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    if (!isVideo && !isImage) {
      toast.error("Only images and videos are supported.");
      return;
    }
    if (isVideo && file.size > 50 * 1024 * 1024) {
      toast.error("Video must be under 50MB.");
      return;
    }
    if (isImage && file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
    setFileType(isVideo ? "video" : "image");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { toast.error("Please add a photo or video."); return; }
    if (!caption.trim()) { toast.error("Please write a caption."); return; }

    try {
      setSubmitting(true);
      
      // 1. Upload File
      const formData = new FormData();
      formData.append("file", file);
      
      const endpoint = fileType === "image" ? "/uploads/image" : "/uploads/video";
      const uploadRes = await api.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      const mediaUrl = uploadRes.data.data?.url || uploadRes.data.url || uploadRes.data.data;
      
      if (!mediaUrl) {
        throw new Error("Failed to get media URL from upload.");
      }

      // 2. Create Moment
      const momentData = {
        description: caption,
        mediaUrl: mediaUrl,
        mediaType: fileType,
        location: location
      };
      
      await api.post("/moments", momentData);
      
      toast.success("Moment shared! 🎉");
      navigate("/moments");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err?.response?.data?.message || "Failed to share moment. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const userName = user?.name || user?.fullName || "You";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-sm">
        <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition text-gray-700 dark:text-slate-200"
          >
            <FiArrowLeft size={22} />
          </button>
          <h1 className="font-bold text-gray-900 dark:text-white text-lg">New Moment</h1>
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
            {submitting ? "Sharing..." : "Share"}
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
            <p className="font-bold text-gray-900 dark:text-white">{userName}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">Sharing to Mahii Moments</p>
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
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
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
                <p className="font-bold text-gray-900 dark:text-white text-lg">Add Photo or Video</p>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Drag & drop or tap to choose</p>
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-sm shadow-md shadow-orange-500/20 hover:bg-orange-600 transition"
                >
                  <FiImage size={16} /> Photo
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); videoInputRef.current?.click(); }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                >
                  <FiVideo size={16} /> Video
                </button>
              </div>
              <p className="text-xs text-gray-400 dark:text-slate-500">Images up to 10MB • Videos up to 50MB</p>
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
                  className="w-full max-h-[500px] object-contain"
                />
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-[500px] object-cover"
                />
              )}
              <button
                type="button"
                onClick={() => { setPreview(null); setFileType(null); }}
                className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white rounded-full p-2 hover:bg-black/80 transition"
              >
                <FiX size={18} />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 text-orange-500 rounded-full p-2.5 shadow-md hover:scale-110 transition"
              >
                <FiPlus size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {/* Caption */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-5">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption... share your experience, food story, or local discovery ✨"
            rows={4}
            maxLength={500}
            className="w-full resize-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 bg-transparent outline-none text-sm leading-relaxed"
          />
          <p className="text-right text-xs text-gray-400 dark:text-slate-500 mt-2">{caption.length}/500</p>
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

        {/* Tips */}
        <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 rounded-2xl p-4">
          <p className="text-xs font-semibold text-orange-700 dark:text-orange-300 mb-1">💡 Tips for a great Moment</p>
          <ul className="text-xs text-orange-600 dark:text-orange-400 space-y-1 list-disc list-inside">
            <li>Share your food experience at a local shop</li>
            <li>Tag the location so neighbours can discover it</li>
            <li>Be authentic — local experiences resonate the most!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
