import { useEffect, useState } from "react";

const DEFAULT_FLAGS = {
  onlineOrdering: true,
  delivery: true,
  pickup: true,
  chat: true,
  reviews: true,
  coupons: true,
  loyaltyProgram: true,
  goldMembership: true,
  liveTracking: true,
  referrals: true,
};

export default function FeatureFlags({
  settings = {},
  loading = false,
  onSave,
}) {
  const [flags, setFlags] = useState(DEFAULT_FLAGS);

  useEffect(() => {
    setFlags({
      ...DEFAULT_FLAGS,
      ...(settings.featureFlags || {}),
    });
  }, [settings]);

  function toggleFlag(key) {
    setFlags((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave?.({
      featureFlags: flags,
    });
  }

  const features = [
    ["onlineOrdering", "🛒 Online Ordering"],
    ["delivery", "🚚 Delivery"],
    ["pickup", "📦 Pickup"],
    ["chat", "💬 Chat"],
    ["reviews", "⭐ Reviews"],
    ["coupons", "🎫 Coupons"],
    ["loyaltyProgram", "🎁 Loyalty Program"],
    ["goldMembership", "🪙 Gold Membership"],
    ["liveTracking", "📍 Live Tracking"],
    ["referrals", "🤝 Referrals"],
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-semibold">Feature Flags</h2>

      <div className="space-y-4">
        {features.map(([key, label]) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
          >
            <span className="font-medium">{label}</span>

            <input
              type="checkbox"
              checked={flags[key]}
              onChange={() => toggleFlag(key)}
            />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Feature Flags"}
        </button>
      </div>
    </form>
  );
}
