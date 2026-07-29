import {
  FiActivity,
  FiUsers,
  FiMail,
  FiMousePointer,
  FiTrendingUp,
  FiTag,
  FiGift,
  FiAward,
  FiDollarSign,
  FiBarChart2,
} from "react-icons/fi";

const cards = [
  {
    key: "activeCampaigns",
    title: "Active Campaigns",
    icon: FiActivity,
    color: "bg-blue-500",
  },
  {
    key: "campaignReach",
    title: "Campaign Reach",
    icon: FiUsers,
    color: "bg-indigo-500",
  },
  {
    key: "openRate",
    title: "Open Rate",
    suffix: "%",
    icon: FiMail,
    color: "bg-green-500",
  },
  {
    key: "clickRate",
    title: "Click Rate",
    suffix: "%",
    icon: FiMousePointer,
    color: "bg-cyan-500",
  },
  {
    key: "conversionRate",
    title: "Conversion",
    suffix: "%",
    icon: FiTrendingUp,
    color: "bg-purple-500",
  },
  {
    key: "couponRedemptions",
    title: "Coupon Uses",
    icon: FiTag,
    color: "bg-orange-500",
  },
  {
    key: "referralSignups",
    title: "Referral Signups",
    icon: FiGift,
    color: "bg-pink-500",
  },
  {
    key: "loyaltyMembers",
    title: "Loyalty Members",
    icon: FiAward,
    color: "bg-yellow-500",
  },
  {
    key: "revenueGenerated",
    title: "Revenue",
    prefix: "₹",
    icon: FiDollarSign,
    color: "bg-emerald-500",
  },
  {
    key: "roi",
    title: "Marketing ROI",
    suffix: "%",
    icon: FiBarChart2,
    color: "bg-red-500",
  },
];

export default function CampaignStatistics({
  loading,
  statistics = {},
}) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: cards.length }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  {card.prefix || ""}
                  {statistics[card.key] ?? 0}
                  {card.suffix || ""}
                </h2>

              </div>

              <div
                className={`${card.color} rounded-xl p-3 text-white`}
              >
                <Icon size={22} />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
