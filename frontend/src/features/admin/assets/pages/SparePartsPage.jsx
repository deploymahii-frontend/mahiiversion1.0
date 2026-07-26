import {
  FiPackage,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiSearch,
  FiEye,
  FiShoppingCart,
  FiAlertTriangle,
  FiArchive,
} from "react-icons/fi";

export default function SparePartsPage({
  loading,
  parts = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreatePart,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] rounded-xl bg-gray-100 animate-pulse"/>
      </div>
    );
  }

  const badge = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";
      case "Out of Stock":
        return "bg-red-100 text-red-700";
      case "Reserved":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiPackage />
            Spare Parts Management
          </h2>

          <p className="text-gray-500">
            Manage maintenance spare parts inventory, reservations, and consumption.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="border rounded-lg p-3"
          >
            <FiRefreshCw />
          </button>

          <button
            onClick={onExport}
            className="bg-green-600 text-white px-5 rounded-lg"
          >
            <FiDownload className="inline mr-2"/>
            Export
          </button>

          <button
            onClick={onCreatePart}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Spare Part
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            className="w-full rounded-lg border py-2 pl-10"
            placeholder="Search spare parts..."
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
          />

        </div>

      </div>

      {/* Table */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Part</th>
              <th className="text-center">SKU</th>
              <th className="text-center">Stock</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {parts.map((part) => (

              <tr key={part.id} className="border-t">

                <td className="p-4 font-medium">
                  {part.name}
                </td>

                <td className="text-center">
                  {part.sku}
                </td>

                <td className="text-center">
                  {part.stock}
                </td>

                <td className="text-center">
                  <span className={`rounded-full px-3 py-1 ${badge(part.status)}`}>
                    {part.status}
                  </span>
                </td>

                <td className="text-center">

                  <button
                    onClick={() => onView?.(part)}
                    className="border rounded p-2"
                  >
                    <FiEye />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Dashboard */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiArchive size={24}/>
          <h3 className="mt-4 font-semibold">Parts Catalog</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiPackage size={24}/>
          <h3 className="mt-4 font-semibold">Inventory</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiShoppingCart size={24}/>
          <h3 className="mt-4 font-semibold">Purchase Requests</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiAlertTriangle size={24}/>
          <h3 className="mt-4 font-semibold">Low Stock Alerts</h3>
        </div>

      </div>

    </div>
  );
}
