import {
  FiFileText,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPrinter,
  FiEye,
  FiMail,
  FiMessageCircle,
} from "react-icons/fi";

export default function InvoiceManagement({
  loading,
  overview = {},
  invoices = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onView,
  onPrint,
  onEmail,
  onWhatsApp,
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
      title: "Invoices Issued",
      value: overview.issued ?? 0,
    },
    {
      title: "Paid",
      value: overview.paid ?? 0,
    },
    {
      title: "Pending",
      value: overview.pending ?? 0,
    },
    {
      title: "Total Invoice Value",
      value: overview.totalValue ?? "₹0",
    },
  ];

  const paymentStatusColor = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Partial: "bg-blue-100 text-blue-700",
    Overdue: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiFileText />
            Invoice Management
          </h2>

          <p className="text-gray-500">Manage GST-compliant invoices and payment status.</p>
        </div>

        <div className="flex gap-3">
          <button onClick={onRefresh} className="rounded-lg border p-3">
            <FiRefreshCw />
          </button>

          <button onClick={onExport} className="rounded-lg bg-green-600 px-5 text-white">
            <FiDownload className="mr-2 inline" />
            Export
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.title} className="rounded-2xl bg-white shadow-sm p-5">
            <p className="text-sm text-gray-500">{card.title}</p>
            <h3 className="mt-3 text-3xl font-bold">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search invoice..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Invoice No.</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t">
                <td className="p-4">{invoice.number}</td>
                <td className="p-4">{invoice.customer}</td>
                <td className="p-4">{invoice.orderNumber}</td>
                <td className="p-4">{invoice.amount}</td>

                <td className="p-4">
                  <span className={`rounded-full px-3 py-1 text-sm ${paymentStatusColor[invoice.paymentStatus]}`}>
                    {invoice.paymentStatus}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => onView?.(invoice)} className="rounded border p-2">
                      <FiEye />
                    </button>

                    <button onClick={() => onPrint?.(invoice)} className="rounded border p-2">
                      <FiPrinter />
                    </button>

                    <button onClick={() => onEmail?.(invoice)} className="rounded border p-2">
                      <FiMail />
                    </button>

                    <button onClick={() => onWhatsApp?.(invoice)} className="rounded border p-2">
                      <FiMessageCircle />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        Order → Invoice → Payment → Accounting → Tax Filing
      </div>
    </div>
  );
}
