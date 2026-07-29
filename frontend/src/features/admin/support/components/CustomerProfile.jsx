import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiShoppingBag,
  FiCreditCard,
  FiGift,
  FiMessageSquare,
  FiStar,
  FiAlertTriangle,
} from "react-icons/fi";

export default function CustomerProfile({
  loading,
  customer = {},
  statistics = {},
  recentOrders = [],
  supportHistory = [],
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

      {/* Header */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="flex items-center gap-5">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
            {customer.name?.charAt(0)}
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              {customer.name}
            </h2>

            <p className="text-gray-500">
              Customer ID: {customer.customerId}
            </p>

          </div>

        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <Info icon={FiPhone} label="Phone" value={customer.phone} />
          <Info icon={FiMail} label="Email" value={customer.email} />
          <Info icon={FiMapPin} label="Location" value={customer.location} />
          <Info icon={FiStar} label="Membership" value={customer.membership} />

        </div>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon={FiShoppingBag}
          title="Orders"
          value={statistics.orders}
          color="bg-blue-500"
        />

        <StatCard
          icon={FiCreditCard}
          title="Total Spent"
          value={`₹${statistics.totalSpent}`}
          color="bg-green-500"
        />

        <StatCard
          icon={FiGift}
          title="Reward Points"
          value={statistics.rewardPoints}
          color="bg-purple-500"
        />

        <StatCard
          icon={FiMessageSquare}
          title="Support Tickets"
          value={statistics.tickets}
          color="bg-orange-500"
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

                <div className="font-semibold">
                  #{order.id}
                </div>

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

      {/* Support */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h3 className="mb-5 text-xl font-semibold">
          Support History
        </h3>

        <div className="space-y-3">

          {supportHistory.map((ticket) => (

            <div
              key={ticket.id}
              className="rounded-xl border p-4"
            >

              <div className="flex justify-between">

                <strong>#{ticket.id}</strong>

                <span>{ticket.status}</span>

              </div>

              <p className="mt-2 text-gray-600">
                {ticket.subject}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Risk */}

      <div className="rounded-2xl bg-white border border-yellow-300 bg-yellow-50 p-6">

        <div className="flex items-center gap-3">

          <FiAlertTriangle className="text-yellow-600" />

          <strong>Customer Insights</strong>

        </div>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">

          <li>High lifetime value customer</li>
          <li>Preferred evening ordering</li>
          <li>Gold loyalty member</li>
          <li>No payment fraud history</li>

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

function StatCard({ icon: Icon, title, value, color }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="mt-3 text-3xl font-bold">{value}</h3>
        </div>
        <div className={`${color} rounded-xl p-3 text-white`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
