import {
  FiHome,
  FiPhone,
  FiMail,
  FiMapPin,
  FiDollarSign,
  FiShoppingBag,
  FiStar,
  FiTrendingUp,
  FiAlertTriangle,
  FiCheckCircle,
  FiShield,
  FiFileText,
} from "react-icons/fi";

export default function MerchantProfile({
  loading,
  merchant = {},
  statistics = {},
  recentOrders = [],
  recentTickets = [],
  violations = [],
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[720px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Merchant Header */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="flex items-center gap-5">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-700">
            {merchant.name?.charAt(0)}
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              {merchant.name}
            </h2>

            <p className="text-gray-500">
              Merchant ID : {merchant.id}
            </p>

          </div>

        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <Info icon={FiPhone} label="Phone" value={merchant.phone} />
          <Info icon={FiMail} label="Email" value={merchant.email} />
          <Info icon={FiMapPin} label="Location" value={merchant.location} />
          <Info icon={FiHome} label="Category" value={merchant.category} />

        </div>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Revenue"
          value={`₹${statistics.revenue}`}
          icon={FiDollarSign}
          color="bg-green-500"
        />

        <StatCard
          title="Orders"
          value={statistics.orders}
          icon={FiShoppingBag}
          color="bg-blue-500"
        />

        <StatCard
          title="Rating"
          value={statistics.rating}
          icon={FiStar}
          color="bg-yellow-500"
        />

        <StatCard
          title="Growth"
          value={`${statistics.growth}%`}
          icon={FiTrendingUp}
          color="bg-purple-500"
        />

      </div>

      {/* Orders */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h3 className="mb-5 text-xl font-semibold">
          Recent Orders
        </h3>

        <div className="space-y-3">

          {recentOrders.map((order) => (

            <div
              key={order.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >

              <div>

                <strong>#{order.id}</strong>

                <div className="text-sm text-gray-500">
                  {order.date}
                </div>

              </div>

              <div>₹{order.amount}</div>

              <div>{order.status}</div>

            </div>

          ))}

        </div>

      </div>

      {/* Support Tickets */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h3 className="mb-5 text-xl font-semibold">
          Support History
        </h3>

        <div className="space-y-3">

          {recentTickets.map((ticket) => (

            <div
              key={ticket.id}
              className="rounded-xl border p-4"
            >

              <div className="flex justify-between">

                <strong>#{ticket.id}</strong>

                <span>{ticket.status}</span>

              </div>

              <div className="mt-2">
                {ticket.subject}
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Compliance */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h3 className="mb-5 text-xl font-semibold">
          Compliance & Violations
        </h3>

        <div className="space-y-3">

          {violations.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >

              <div className="flex items-center gap-3">

                {item.status === "PASS" ? (
                  <FiCheckCircle className="text-green-600" />
                ) : (
                  <FiAlertTriangle className="text-red-600" />
                )}

                {item.title}

              </div>

              <span>{item.date}</span>

            </div>

          ))}

        </div>

      </div>

      {/* Merchant Insights */}

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">

        <div className="flex items-center gap-3">

          <FiShield className="text-blue-600" />

          <h3 className="font-semibold">
            Business Insights
          </h3>

        </div>

        <ul className="mt-4 list-disc space-y-2 pl-6">

          <li>Top performing restaurant this month</li>
          <li>Orders increased by 18% this week</li>
          <li>Eligible for premium promotion campaign</li>
          <li>No payout issues detected</li>

        </ul>

      </div>

    </div>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-4">
      <Icon className="text-blue-600" />
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {value}
          </h3>

        </div>

        <div className={`${color} rounded-xl p-3 text-white`}>
          <Icon size={22} />
        </div>

      </div>

    </div>
  );
}
// Placeholder for MerchantProfile component
export default function MerchantProfile() {
  return null;
}
