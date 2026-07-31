import { Copy, Share2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ReferralCodeCard({ code = "MAHII100VIP" }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Referral code copied!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join Mahii Market",
        text: `Use my code ${code} to get ₹100 off your first order!`,
        url: "https://mahii.in",
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
      <h3 className="font-bold text-lg text-slate-800">Your Unique Referral Code</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 flex items-center justify-between font-black text-xl text-slate-800 tracking-wider">
          <span>{code}</span>
          <button onClick={handleCopy} className="text-slate-400 hover:text-blue-600 transition">
            <Copy size={20} />
          </button>
        </div>

        <button
          onClick={handleShare}
          className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition shadow-sm"
        >
          <Share2 size={18} />
          Share Link
        </button>
      </div>
    </section>
  );
}
