import {
  FiGrid,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiPrinter,
  FiCamera,
} from "react-icons/fi";

export default function BarcodeManagementPage({
  loading,
  labels = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onPrint,
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
            <FiGrid />
            Barcode & QR Management
          </h2>

          <p className="text-gray-500">
            Generate, print and manage barcode and QR labels across the warehouse.
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
            Generate Labels
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
              placeholder="Search barcode..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Code</th>
              <th className="p-4 text-left">Item</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Format</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {labels.map((label) => (

              <tr
                key={label.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {label.code}
                </td>

                <td className="p-4">
                  {label.item}
                </td>

                <td className="p-4">
                  {label.type}
                </td>

                <td className="p-4">
                  {label.format}
                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(label)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onPrint?.(label)}
                      className="rounded border p-2"
                    >
                      <FiPrinter />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Bottom Cards */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiPrinter className="mb-3 text-indigo-600" size={22} />

          <h3 className="font-semibold">
            Batch Label Printing
          </h3>

          <p className="mt-2 text-gray-500">
            Print barcode and QR labels in bulk for products, bins and pallets.
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiCamera className="mb-3 text-green-600" size={22} />

          <h3 className="font-semibold">
            Scanner Integration
          </h3>

          <p className="mt-2 text-gray-500">
            Compatible with handheld barcode scanners and mobile QR scanners.
          </p>

        </div>

      </div>

    </div>
  );
}
