import {
  FiStar,
  FiTrendingUp,
  FiMessageSquare,
  FiAlertCircle,
  FiThumbsUp,
  FiBarChart2,
  FiRefreshCw,
} from "react-icons/fi";

export default function FeedbackAnalytics({
  loading,
  overview = {},
  ratingDistribution = [],
  recentFeedback = [],
  alerts = [],
  onRefresh,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[700px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const stats = [
    {
      title: "Average Rating",
      value: overview.averageRating ?? "0.0",
      icon: FiStar,
      color: "bg-yellow-500",
    },
    {
      title: "Feedback Received",
      value: overview.totalFeedback ?? 0,
      icon: FiMessageSquare,
      color: "bg-blue-500",
    },
    {
      title: "Positive Feedback",
      value: `${overview.positiveRate ?? 0}%`,
      icon: FiThumbsUp,
      color: "bg-green-500",
    },
    {
      title: "Trend",
      value: `${overview.trend ?? 0}%`,
      icon: FiTrendingUp,
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
              Feedback Analytics
            </h2>

            <p className="text-gray-500">
              Customer and merchant satisfaction insights.
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

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>

                  <h3 className="mt-3 text-3xl font-bold">
                    {item.value}
                  </h3>

                </div>

                <div className={`${item.color} rounded-xl p-3 text-white`}>
                  <Icon size={22} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Rating Distribution */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h3 className="mb-5 text-xl font-semibold">
          Rating Distribution
        </h3>

        <div className="space-y-4">

          {ratingDistribution.map((item) => (

            <div
              key={item.rating}
              className="flex items-center gap-4"
            >

              <div className="w-16 font-semibold">
                {item.rating} ★
              </div>

              <div className="h-3 flex-1 rounded-full bg-gray-200">

                <div
                  className="h-3 rounded-full bg-yellow-500"
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />

              </div>

              <div className="w-16 text-right">
                {item.percentage}%
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Recent Feedback */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h3 className="mb-5 text-xl font-semibold">
          Recent Feedback
        </h3>

        <div className="space-y-4">

          {recentFeedback.map((feedback) => (

            <div
              key={feedback.id}
              className="rounded-xl border p-4"
            >

              <div className="flex items-center justify-between">

                <strong>{feedback.customer}</strong>

                <span>{feedback.rating} ★</span>

              </div>

              <p className="mt-2 text-gray-600">
                {feedback.comment}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Alerts */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center gap-2">

          <FiAlertCircle />

          <h3 className="text-xl font-semibold">
            Feedback Alerts
          </h3>

        </div>

        <div className="space-y-3">

          {alerts.map((alert) => (

            <div
              key={alert.id}
              className="rounded-xl border border-red-200 bg-red-50 p-4"
            >
              {alert.message}
            </div>

          ))}

        </div>

      </div>

      {/* Placeholder for Charts */}

      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">

        <FiBarChart2 className="mx-auto mb-3" size={28} />

        Monthly Feedback Trend • Merchant Comparison • AI Sentiment Summary

      </div>

    </div>
  );
}
// Placeholder for FeedbackAnalytics component
export default function FeedbackAnalytics() {
  return null;
}
