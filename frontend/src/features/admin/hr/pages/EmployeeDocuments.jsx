import {
  FiFolder,
  FiFileText,
  FiShield,
  FiAlertTriangle,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiEye,
  FiDownload,
} from "react-icons/fi";

export default function EmployeeDocuments({
  loading,
  overview = {},
  documents = [],
  search = "",
  onSearch,
  onRefresh,
  onView,
  onDownload,
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
      title: "Total Documents",
      value: overview.totalDocuments ?? 0,
      icon: FiFolder,
      color: "bg-blue-500",
    },
    {
      title: "Verified",
      value: overview.verified ?? 0,
      icon: FiShield,
      color: "bg-green-500",
    },
    {
      title: "Pending Review",
      value: overview.pending ?? 0,
      icon: FiFileText,
      color: "bg-yellow-500",
    },
    {
      title: "Expiring Soon",
      value: overview.expiring ?? 0,
      icon: FiAlertTriangle,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Employee Documents
          </h2>

          <p className="text-gray-500">
            Secure document repository and compliance management.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="rounded-lg border p-3 hover:bg-gray-100"
        >
          <FiRefreshCw />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white shadow-sm p-5"
            >
              <div className="flex justify-between">
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
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <div className="flex gap-4">

          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search employee or document..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>
      </div>

      {/* Documents Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Document</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Expiry</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {documents.map((doc) => (
              <tr
                key={doc.id}
                className="border-t"
              >
                <td className="p-4">{doc.employee}</td>
                <td className="p-4">{doc.document}</td>
                <td className="p-4">{doc.category}</td>
                <td className="p-4">{doc.expiry}</td>

                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {doc.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(doc)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onDownload?.(doc)}
                      className="rounded border p-2"
                    >
                      <FiDownload />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Placeholder */}
      <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">
        Identity Documents • Contracts • Education • Certifications • Tax Records • Version History
      </div>

    </div>
  );
}
