const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function AnalyticsOverview({
  data = {},
  loading = false,
}) {
  const cards = [
    {
      title: "Total Revenue",
      value: formatCurrency(data.totalRevenue),
      icon: "💰",
    },
    {
      title: "Total Orders",
      value: data.totalOrders ?? 0,
      icon: "📦",
    },
    {
      title: "Total Users",
      value: data.totalUsers ?? 0,
      icon: "👤",
    },
    {
      title: "Total Shops",
      value: data.totalShops ?? 0,
      icon: "🏪",
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(data.monthlyRevenue),
      icon: "📈",
    },
    {
      title: "Average Order Value",
      value: formatCurrency(data.averageOrderValue),
      icon: "📊",
    },
    {
      title: "Delivered Orders",
      value: data.deliveredOrders ?? 0,
      icon: "🚚",
    },
    {
      title: "Cancelled Orders",
      value: data.cancelledOrders ?? 0,
      icon: "❌",
    },
  ];

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl bg-white p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-3xl">{card.icon}</span>
          </div>

          <p className="text-sm text-gray-500">{card.title}</p>

          <h2 className="mt-2 text-3xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
