import {
  FiEye,
  FiDownload,
  FiSend,
  FiFileText,
} from "react-icons/fi";

const statusStyles = {
  PAID: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-blue-100 text-blue-700",
};

export default function InvoiceTable({
  loading,
  invoices = [],
  onView,
  onDownload,
  onResend,
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

        <FiFileText size={24} />

        <div>

          <h2 className="text-2xl font-bold">
            Invoices
          </h2>

          <p className="text-gray-500">
            Billing invoices and payment records
          </p>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="py-3">Invoice</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Tax</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {invoices.map((invoice) => (

              <tr
                key={invoice.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4 font-medium">
                  {invoice.invoiceNumber}
                </td>

                <td>{invoice.customerName}</td>

                <td>₹{invoice.amount}</td>

                <td>₹{invoice.tax}</td>

                <td>₹{invoice.discount}</td>

                <td className="font-semibold">
                  ₹{invoice.total}
                </td>

                <td>{invoice.createdAt}</td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      statusStyles[
                        invoice.paymentStatus
                      ]
                    }`}
                  >
                    {invoice.paymentStatus}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() =>
                        onView?.(invoice)
                      }
                      className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                      title="View"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() =>
                        onDownload?.(invoice)
                      }
                      className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                      title="Download"
                    >
                      <FiDownload />
                    </button>

                    <button
                      onClick={() =>
                        onResend?.(invoice)
                      }
                      className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700"
                      title="Resend"
                    >
                      <FiSend />
                    </button>

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
