import {
  FiCreditCard,
  FiEye,
  FiRefreshCw,
  FiRotateCcw,
} from "react-icons/fi";

const statusStyles = {
  SUCCESS: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-blue-100 text-blue-700",
};

export default function PaymentHistory({
  loading,
  payments = [],
  onView,
  onRetry,
  onRefund,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-80 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <FiCreditCard size={24} />

        <div>
          <h2 className="text-2xl font-bold">
            Payment History
          </h2>
          <p className="text-gray-500">
            Transaction records across all payment gateways
          </p>
        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="py-3">Payment ID</th>
              <th>Customer</th>
              <th>Gateway</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {payments.map((payment) => (

              <tr
                key={payment.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4 font-medium">
                  {payment.paymentId}
                </td>

                <td>{payment.customerName}</td>

                <td>{payment.gateway}</td>

                <td>{payment.method}</td>

                <td className="font-semibold">
                  ₹{payment.amount}
                </td>

                <td>{payment.createdAt}</td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      statusStyles[payment.status]
                    }`}
                  >
                    {payment.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() =>
                        onView?.(payment)
                      }
                      className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                      title="View Details"
                    >
                      <FiEye />
                    </button>

                    {payment.status === "FAILED" && (
                      <button
                        onClick={() =>
                          onRetry?.(payment)
                        }
                        className="rounded-lg bg-amber-600 p-2 text-white hover:bg-amber-700"
                        title="Retry Payment"
                      >
                        <FiRefreshCw />
                      </button>
                    )}

                    {payment.status === "SUCCESS" && (
                      <button
                        onClick={() =>
                          onRefund?.(payment)
                        }
                        className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                        title="Refund"
                      >
                        <FiRotateCcw />
                      </button>
                    )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
