import { Link } from "react-router-dom";

const demoOrders = [
  {
    id: "MHI-20260720-1001",
    customer: "Rahul Patil",
    amount: 320,
    status: "PLACED",
    time: "2 min ago",
  },
  {
    id: "MHI-20260720-1002",
    customer: "Priya Sharma",
    amount: 540,
    status: "PREPARING",
    time: "10 min ago",
  },
  {
    id: "MHI-20260720-1003",
    customer: "Amit Joshi",
    amount: 180,
    status: "COMPLETED",
    time: "25 min ago",
  },
];

function getStatusClasses(status) {
  switch (status) {
    case "PLACED":
      return "bg-blue-100 text-blue-700";
    case "PREPARING":
      return "bg-orange-100 text-orange-700";
    case "COMPLETED":
      return "bg-green-100 text-green-700";
    case "CANCELLED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function RecentOrders({ orders = demoOrders }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Orders</h2>

        <Link
          to="/shop/orders"
          className="text-sm font-medium text-orange-500 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="pb-3">Order</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-none">
                <td className="py-4 font-medium">{order.id}</td>
                <td>{order.customer}</td>
                <td>₹{order.amount}</td>
                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="text-sm text-gray-500">{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
