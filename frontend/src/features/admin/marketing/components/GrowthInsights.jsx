import {
  FiTrendingUp,
  FiTrendingDown,
  FiTarget,
  FiDollarSign,
  FiUsers,
  FiMapPin,
  FiShoppingBag,
  FiAlertTriangle,
  FiCheckCircle,
  FiRefreshCw,
} from "react-icons/fi";

export default function GrowthInsights({
  loading,
  insights = {},
  recommendations = [],
  opportunities = [],
  onRefresh,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              Growth Insights
            </h2>

            <p className="text-gray-500">
              Strategic recommendations and predictive analytics
            </p>
          </div>

          <button
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-gray-100"
          >
            <FiRefreshCw />
            Refresh
          </button>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <InsightCard
            icon={FiTrendingUp}
            title="Projected Revenue"
            value={`₹${insights.projectedRevenue ?? 0}`}
            color="green"
          />

          <InsightCard
            icon={FiUsers}
            title="Predicted New Customers"
            value={insights.predictedCustomers ?? 0}
            color="blue"
          />

          <InsightCard
            icon={FiTrendingDown}
            title="Churn Risk"
            value={`${insights.churnRisk ?? 0}%`}
            color="red"
          />

          <InsightCard
            icon={FiDollarSign}
            title="Projected ROI"
            value={`${insights.projectedROI ?? 0}%`}
            color="purple"
          />

        </div>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h3 className="mb-5 text-xl font-bold">
            Growth Recommendations
          </h3>

          <div className="space-y-4">

            {recommendations.map((item) => (

              <div
                key={item.id}
                className="flex gap-4 rounded-xl border p-4"
              >

                <div className="rounded-full bg-green-100 p-2 text-green-600">
                  <FiCheckCircle />
                </div>

                <div>

                  <h4 className="font-semibold">
                    {item.title}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h3 className="mb-5 text-xl font-bold">
            Business Opportunities
          </h3>

          <div className="space-y-4">

            {opportunities.map((item) => (

              <div
                key={item.id}
                className="rounded-xl border p-4"
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    {item.type === "location" && <FiMapPin />}
                    {item.type === "merchant" && <FiShoppingBag />}
                    {item.type === "marketing" && <FiTarget />}
                    {item.type === "risk" && <FiAlertTriangle />}

                    <strong>{item.title}</strong>

                  </div>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {item.priority}
                  </span>

                </div>

                <p className="mt-3 text-sm text-gray-500">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

function InsightCard({
  icon: Icon,
  title,
  value,
  color,
}) {
  const colors = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
  };

  return (
    <div className="rounded-xl border bg-gray-50 p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {value}
          </h3>

        </div>

        <div
          className={`${colors[color]} rounded-xl p-3 text-white`}
        >
          <Icon size={22} />
        </div>

      </div>

    </div>
  );
}
