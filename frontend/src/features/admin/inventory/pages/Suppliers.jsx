import {
  FiTruck,
  FiPlus,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiEdit,
  FiTrash2,
  FiPhone,
} from "react-icons/fi";

export default function Suppliers({
  loading,
  overview = {},
  suppliers = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onEdit,
  onDelete,
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
      title: "Total Suppliers",
      value: overview.totalSuppliers ?? 0,
    },
    {
      title: "Active Suppliers",
      value: overview.activeSuppliers ?? 0,
    },
    {
      title: "Pending Orders",
      value: overview.pendingOrders ?? 0,
    },
    {
      title: "Average Rating",
      value: overview.averageRating ?? "0.0",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiTruck />
            Supplier Management
          </h2>
          <p className="text-gray-500">
            Manage vendors, procurement partners, and supplier relationships.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onRefresh} className="rounded-lg border p-3">
            <FiRefreshCw />
          </button>

          <button
            onClick={onExport}
            className="rounded-lg bg-green-600 px-5 text-white"
          >
            <FiDownload className="mr-2 inline" />
            Export
          </button>

          <button
            onClick={onCreate}
            className="rounded-lg bg-indigo-600 px-5 text-white"
          >
            <FiPlus className="mr-2 inline" />
            Supplier
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{card.title}</p>
            <h3 className="mt-3 text-3xl font-bold">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search supplier..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>
        </div>
      </div>

      {/* Supplier Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Supplier</th>
              <th className="p-4 text-left">Contact</th>
              <th className="p-4 text-left">GST</th>
              <th className="p-4 text-left">Products</th>
              <th className="p-4 text-left">Rating</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                className="border-t"
              >
                <td className="p-4">{supplier.name}</td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <FiPhone />
                    {supplier.contact}
                  </div>
                </td>

                <td className="p-4">{supplier.gst}</td>
                <td className="p-4">{supplier.products}</td>
                <td className="p-4">{supplier.rating}</td>

                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {supplier.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onView?.(supplier)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(supplier)}
                      className="rounded border p-2"
                    >
                      <FiEdit />
                    </button>

                    <button
                      onClick={() => onDelete?.(supplier)}
                      className="rounded border p-2 text-red-600"
                    >
                      <FiTrash2 />
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
