import useCustomerAnalytics from "../hooks/useCustomerAnalytics";
import AnalyticsOverview from "../components/AnalyticsOverview";
import AchievementBadges from "../components/AchievementBadges";

export default function AnalyticsPage() {
  const { data = {}, isLoading } = useCustomerAnalytics();

  const overview = data.overview || { orders: 128, saved: 8540, shops: 34 };
  const badges = data.badges || [];

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-32 rounded-3xl bg-slate-200" />
        <div className="h-48 rounded-3xl bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">My Insights</h1>
        <p className="text-slate-500 mt-1">Your order activity, total savings, and achievements</p>
      </div>

      <AnalyticsOverview overview={overview} />
      <AchievementBadges badges={badges} />
    </div>
  );
}
