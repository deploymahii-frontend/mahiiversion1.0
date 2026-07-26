import {
  FiDollarSign,
  FiTrendingUp,
  FiTarget,
  FiGlobe,
  FiShoppingBag,
  FiBarChart2,
  FiRefreshCw,
} from "react-icons/fi";

export default function RevenueOverview({
  loading,
  overview = {},
  merchantRevenue = [],
  categoryRevenue = [],
  regionalRevenue = [],
  onRefresh,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[700px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const cards = [
    {
      title: "Today's Revenue",
      value: overview.todayRevenue ?? "₹0",
      icon: FiDollarSign,
      color: "bg-green-500",
    },
    {
      title: "Monthly Revenue",
      value: overview.monthRevenue ?? "₹0",
      icon: FiTrendingUp,
      color: "bg-blue-500",
    },
    {
      title: "Growth",
      value: `${overview.growth ?? 0}%`,
      icon: FiTarget,
      color: "bg-orange-500",
    },
    {
      title: "Gross Revenue",
      value: overview.grossRevenue ?? "₹0",
      icon: FiBarChart2,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              Revenue Overview
            </h2>

            <p className="text-gray-500">
              Complete revenue insights across the Mahii platform.
            </p>
          </div>

          <button
            onClick={onRefresh}
            className="rounded-lg border p-3 hover:bg-gray-100"
          >
            <FiRefreshCw />
          </button>

        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h3 className="mt-3 text-3xl font-bold">
                    {card.value}
                  </h3>
                </div>

                <div className={`${card.color} rounded-xl p-3 text-white`}>
                  <Icon size={22} />
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Merchant Revenue */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center gap-2">
          <FiShoppingBag />
          <h3 className="text-xl font-semibold">
            Top Revenue Merchants
          </h3>
        </div>

        <div className="space-y-4">
          {merchantRevenue.map((merchant) => (
            <div
              key={merchant.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <span>{merchant.name}</span>
              <strong>{merchant.revenue}</strong>
            </div>
          ))}
        </div>

      </div>

      {/* Category Revenue */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h3 className="mb-5 text-xl font-semibold">
          Revenue by Category
        </h3>

        <div className="space-y-4">
          {categoryRevenue.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <span>{category.name}</span>
              <strong>{category.revenue}</strong>
            </div>
          ))}
        </div>

      </div>

      {/* Regional Revenue */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center gap-2">
          <FiGlobe />
          <h3 className="text-xl font-semibold">
            Regional Revenue
          </h3>
        </div>

        <div className="space-y-4">
          {regionalRevenue.map((region) => (
            <div
              key={region.region}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <span>{region.region}</span>
              <strong>{region.revenue}</strong>
            </div>
          ))}
        </div>

      </div>

      {/* Charts */}
      <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">

        <FiBarChart2
          size={30}
          className="mx-auto mb-3"
        />

        Daily • Weekly • Monthly • Yearly Revenue Trends

      </div>

    </div>
  );
}
