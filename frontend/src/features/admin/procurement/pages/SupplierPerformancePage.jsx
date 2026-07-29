import {
  FiBarChart2,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiStar,
  FiTruck,
  FiPackage,
  FiTrendingUp,
} from "react-icons/fi";

export default function SupplierPerformancePage({
  loading,
  suppliers = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onView,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiBarChart2 />
            Supplier Performance
          </h2>

          <p className="text-gray-500">
            Evaluate suppliers using procurement KPIs and quality metrics.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="rounded-lg border p-3"
          >
            <FiRefreshCw />
          </button>

          <button
            onClick={onExport}
            className="rounded-lg bg-green-600 px-5 py-3 text-white"
          >
            <FiDownload className="mr-2 inline" />
            Export
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            value={search}
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Search supplier..."
            className="w-full rounded-lg border py-2 pl-10 pr-4"
          />

        </div>

      </div>

      {/* Supplier Performance Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Supplier</th>
              <th className="p-4 text-center">Rating</th>
              <th className="p-4 text-center">On-Time %</th>
              <th className="p-4 text-center">Quality %</th>
              <th className="p-4 text-center">Return %</th>
              <th className="p-4 text-right">Spend</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {suppliers.map((supplier) => (

              <tr
                key={supplier.id}
                className="border-t"
              >

                <td className="p-4 font-medium">
                  {supplier.name}
                </td>

                <td className="p-4 text-center">

                  <div className="flex items-center justify-center gap-1">

                    <FiStar className="text-yellow-500" />

                    {supplier.rating}

                  </div>

                </td>

                <td className="p-4 text-center">
                  {supplier.delivery}
                </td>

                <td className="p-4 text-center">
                  {supplier.quality}
                </td>

                <td className="p-4 text-center">
                  {supplier.returnRate}
                </td>

                <td className="p-4 text-right">
                  {supplier.spend}
                </td>

                <td className="p-4">

                  <button
                    onClick={() => onView?.(supplier)}
                    className="rounded border p-2"
                  >
                    <FiEye />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* KPI Cards */}

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <FiTruck className="mb-3 text-blue-600" size={22} />

          <h4 className="font-semibold">
            Delivery Performance
          </h4>

          <p className="mt-2 text-gray-500">
            Average supplier delivery reliability.
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <FiPackage className="mb-3 text-green-600" size={22} />

          <h4 className="font-semibold">
            Product Quality
          </h4>

          <p className="mt-2 text-gray-500">
            Incoming inspection quality metrics.
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <FiTrendingUp className="mb-3 text-purple-600" size={22} />

          <h4 className="font-semibold">
            Procurement Spend
          </h4>

          <p className="mt-2 text-gray-500">
            Total purchasing value by supplier.
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <FiStar className="mb-3 text-yellow-500" size={22} />

          <h4 className="font-semibold">
            Preferred Suppliers
          </h4>

          <p className="mt-2 text-gray-500">
            Top-performing vendors for procurement.
          </p>

        </div>

      </div>

    </div>
  );
}
