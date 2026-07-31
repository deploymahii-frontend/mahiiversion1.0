import { Award, Flame, Crown, Heart, Gift } from "lucide-react";

export default function AchievementBadges({ badges = [] }) {
  const displayBadges = badges.length
    ? badges
    : [
        { title: "Gold Foodie", icon: Crown, color: "text-amber-500 bg-amber-50" },
        { title: "100 Orders", icon: Flame, color: "text-orange-500 bg-orange-50" },
        { title: "Referral Champ", icon: Gift, color: "text-emerald-500 bg-emerald-50" },
        { title: "Local Explorer", icon: Heart, color: "text-red-500 bg-red-50" },
      ];

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
      <h3 className="font-bold text-lg text-slate-800">Your Achievements</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {displayBadges.map((b, idx) => {
          const Icon = b.icon || Award;
          return (
            <div key={idx} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-center flex flex-col items-center">
              <div className={`p-3 rounded-2xl ${b.color || "bg-blue-50 text-blue-600"}`}>
                <Icon size={24} />
              </div>
              <p className="font-bold text-slate-800 text-xs mt-3">{b.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
