import {
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
  FiRefreshCw,
  FiCreditCard,
  FiFileText,
  FiRotateCcw,
  FiBarChart2,
  FiActivity,
  FiAward,
} from "react-icons/fi";

const cards = [
  {
    key: "monthlyRevenue",
    title: "Monthly Revenue",
    icon: FiDollarSign,
    color: "bg-green-500",
    prefix: "₹",
  },
  {
    key: "annualRevenue",
    title: "Annual Revenue",
    icon: FiTrendingUp,
    color: "bg-blue-500",
    prefix: "₹",
  },
  {
    key: "activeSubscriptions",
    title: "Active Subscriptions",
    icon: FiUsers,
    color: "bg-indigo-500",
  },
  {
    key: "renewalsToday",
    title: "Renewals Today",
    icon: FiRefreshCw,
    color: "bg-cyan-500",
  },
  {
    key: "failedPayments",
    title: "Failed Payments",
    icon: FiCreditCard,
    color: "bg-red-500",
  },
  {
    key: "invoicesGenerated",
    title: "Invoices",
    icon: FiFileText,
    color: "bg-purple-500",
  },
  {
    key: "refundAmount",
    title: "Refund Amount",
    icon: FiRotateCcw,
    color: "bg-orange-500",
    prefix: "₹",
  },
  {
    key: "arpu",
    title: "ARPU",
    icon: FiBarChart2,
    color: "bg-teal-500",
    prefix: "₹",
  },
  {
    key: "churnRate",
    title: "Churn Rate",
    icon: FiActivity,
    color: "bg-pink-500",
    suffix: "%",
  },
  {
    key: "goldSubscribers",
    title: "Mahii Gold",
    icon: FiAward,
    color: "bg-yellow-500",
  },
];

export default function BillingStatistics({
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

                <h3 className="mt-3 text-2xl font-bold">
                  {card.prefix || ""}
                  {statistics[card.key] ?? 0}
                  {card.suffix || ""}
                </h3>
              </div>

              <div
                className={`${card.color} rounded-xl p-3 text-white`}
              >
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
