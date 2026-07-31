import { useState } from "react";
import toast from "react-hot-toast";

export default function PrivacySettings({ settings = {} }) {
  const [privacy, setPrivacy] = useState({
    location: settings.location ?? true,
    analytics: settings.analytics ?? true,
    recommendations: settings.recommendations ?? true,
  });

  const toggle = (key) => {
    const updated = { ...privacy, [key]: !privacy[key] };
    setPrivacy(updated);
    toast.success("Privacy preferences updated.");
  };

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
      <h3 className="font-bold text-lg text-slate-800">Privacy & Data Control</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50">
          <div>
            <h4 className="font-semibold text-slate-800 text-sm">Personalized Recommendations</h4>
            <p className="text-xs text-slate-400 mt-0.5">Use order history to suggest nearby mess and food items</p>
          </div>
          <button
            onClick={() => toggle("recommendations")}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              privacy.recommendations ? "bg-blue-600" : "bg-slate-300"
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              privacy.recommendations ? "translate-x-6" : "translate-x-0"
            }`} />
          </button>
        </div>
      </div>
    </section>
  );
}
