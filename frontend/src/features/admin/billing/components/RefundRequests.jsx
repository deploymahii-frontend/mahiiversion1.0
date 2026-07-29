import {
  FiRotateCcw,
  FiCheck,
  FiX,
  FiEye,
} from "react-icons/fi";

const statusStyles = {
  REQUESTED: "bg-yellow-100 text-yellow-700",
  UNDER_REVIEW: "bg-blue-100 text-blue-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  PROCESSED: "bg-purple-100 text-purple-700",
};

export default function RefundRequests({
  loading,
  refunds = [],
  onView,
  onApprove,
  onReject,
  onProcess,
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

        <FiRotateCcw size={24} />

        <div>
          <h2 className="text-2xl font-bold">
            Refund Requests
          </h2>
          <p className="text-gray-500">
            Review and process customer refund requests
          </p>
        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="py-3">Request ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {refunds.map((refund) => (

              <tr
                key={refund.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4 font-medium">
                  {refund.requestId}
                </td>

                <td>{refund.customerName}</td>

                <td className="font-semibold">
                  ₹{refund.amount}
                </td>

                <td className="max-w-xs truncate">
                  {refund.reason}
                </td>

                <td>{refund.createdAt}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      statusStyles[refund.status]
                    }`}
                  >
                    {refund.status}
                  </span>
                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() =>
                        onView?.(refund)
                      }
                      className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                      title="View"
                    >
                      <FiEye />
                    </button>

                    {refund.status === "REQUESTED" && (
                      <>
                        <button
                          onClick={() =>
                            onApprove?.(refund)
                          }
                          className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                          title="Approve"
                        >
                          <FiCheck />
                        </button>

                        <button
                          onClick={() =>
                            onReject?.(refund)
                          }
                          className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                          title="Reject"
                        >
                          <FiX />
                        </button>
                      </>
                    )}

                    {refund.status === "APPROVED" && (
                      <button
                        onClick={() =>
                          onProcess?.(refund)
                        }
                        className="rounded-lg bg-purple-600 p-2 text-white hover:bg-purple-700"
                        title="Process Refund"
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
