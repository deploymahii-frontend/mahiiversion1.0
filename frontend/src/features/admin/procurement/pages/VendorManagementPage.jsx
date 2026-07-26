import {
  FiUsers,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiEdit,
  FiStar,
  FiPhone,
  FiMail,
} from "react-icons/fi";

export default function VendorManagementPage({
  loading,
  vendors = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onEdit,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const statusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-gray-100 text-gray-700";
      case "Blacklisted":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiUsers />
            Vendor Management
          </h2>

          <p className="text-gray-500">
            Maintain supplier master records and procurement relationships.
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

          <button
            onClick={onCreate}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
          >
            <FiPlus className="mr-2 inline" />
            Add Vendor
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="flex gap-4">

          <div className="relative flex-1">

            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search vendor..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Vendor Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Vendor Code</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Contact</th>
              <th className="p-4 text-left">Rating</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {vendors.map((vendor) => (

              <tr
                key={vendor.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {vendor.code}
                </td>

                <td className="p-4">
                  {vendor.company}
                </td>

                <td className="p-4">

                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <FiPhone size={14} />
                      {vendor.phone}
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <FiMail size={14} />
                      {vendor.email}
                    </div>
                  </div>

                </td>

                <td className="p-4">

                  <div className="flex items-center gap-1">
                    <FiStar className="text-yellow-500" />
                    {vendor.rating}
                  </div>

                </td>

                <td className="p-4">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusColor(vendor.status)}`}>
                    {vendor.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(vendor)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(vendor)}
                      className="rounded border p-2"
                    >
                      <FiEdit />
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
