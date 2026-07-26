import {
  FiFileText,
  FiDownload,
  FiMail,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiBarChart2,
  FiCheckCircle,
} from "react-icons/fi";

export default function InvoiceCenter({
  loading,
  overview = {},
  invoices = [],
  search = "",
  onSearch,
  onRefresh,
  onDownload,
  onEmail,
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
      title: "Invoices Generated",
      value: overview.generated ?? 0,
      icon: FiFileText,
      color: "bg-blue-500",
    },
    {
      title: "Delivered",
      value: overview.delivered ?? 0,
      icon: FiMail,
      color: "bg-green-500",
    },
    {
      title: "Downloaded",
      value: overview.downloaded ?? 0,
      icon: FiDownload,
      color: "bg-purple-500",
    },
    {
      title: "Verified",
      value: overview.verified ?? 0,
      icon: FiCheckCircle,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Invoice Center
            </h2>
            <p className="text-gray-500">
              Generate, deliver and manage customer and merchant invoices.
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
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <h3 className="mt-3 text-3xl font-bold">
                    {card.value}
                  </h3>
                </div>

                <div className={`${card.color} rounded-xl p-3 text-white`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">

          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search Invoice ID / Customer / Merchant..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5 py-2 hover:bg-gray-100">
            <FiFilter className="mr-2 inline" />
            Filters
          </button>

        </div>
      </div>

      {/* Invoice Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Invoice ID</th>
              <th className="p-4 text-left">Customer / Merchant</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-t"
              >
                <td className="p-4">{invoice.invoiceId}</td>
                <td className="p-4">{invoice.party}</td>
                <td className="p-4">{invoice.amount}</td>
                <td className="p-4">{invoice.date}</td>

                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {invoice.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onDownload?.(invoice)}
                      className="rounded-lg border p-2 hover:bg-gray-100"
                    >
                      <FiDownload />
                    </button>

                    <button
                      onClick={() => onEmail?.(invoice)}
                      className="rounded-lg border p-2 hover:bg-gray-100"
                    >
                      <FiMail />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Analytics */}
      <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">
        <FiBarChart2
          className="mx-auto mb-3"
          size={30}
        />
        Invoice Trends • Tax Invoices • Delivery Rate • Download Statistics
      </div>

    </div>
  );
}
