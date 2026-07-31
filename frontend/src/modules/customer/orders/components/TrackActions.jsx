import { Share2, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function TrackActions({ order }) {
  const handleShareETA = () => {
    if (navigator.share) {
      navigator.share({
        title: `Tracking Order #${order?._id}`,
        text: `Track my food order from ${order?.shop?.name || "Mahii"}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Tracking link copied to clipboard!");
    }
  };

  return (
    <section className="grid grid-cols-2 gap-4">
      <button
        onClick={handleShareETA}
        className="py-3 px-4 rounded-2xl border border-slate-200 bg-white text-slate-700 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition"
      >
        <Share2 size={18} />
        Share Live ETA
      </button>

      <Link
        to="/customer/support"
        className="py-3 px-4 rounded-2xl bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
      >
        <HelpCircle size={18} />
        Get Support
      </Link>
    </section>
  );
}
