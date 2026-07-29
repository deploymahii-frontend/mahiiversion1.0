import {
  FiHash,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPrinter,
  FiEye,
  FiPlus,
} from "react-icons/fi";

export default function BarcodeManager({
  loading,
  overview = {},
  barcodes = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onGenerate,
  onPrint,
  onView,
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
      title: "Products Tagged",
      value: overview.productsTagged ?? 0,
    },
    {
      title: "Barcodes Generated",
      value: overview.generated ?? 0,
    },
    {
      title: "QR Codes",
      value: overview.qrCodes ?? 0,
    },
    {
      title: "Labels Printed",
      value: overview.labelsPrinted ?? 0,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiHash />
            Barcode Manager
          </h2>

          <p className="text-gray-500">
            Generate, print and manage product barcodes and QR codes.
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
            className="rounded-lg bg-green-600 px-5 text-white"
          >
            <FiDownload className="mr-2 inline" />
            Export
          </button>

          <button
            onClick={onGenerate}
            className="rounded-lg bg-indigo-600 px-5 text-white"
          >
            <FiPlus className="mr-2 inline" />
            Generate
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

            <h3 className="mt-3 text-3xl font-bold">
              {card.value}
            </h3>
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
              placeholder="Search barcode or product..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Barcode Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">SKU</th>
              <th className="p-4 text-left">Barcode</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {barcodes.map((item) => (

              <tr
                key={item.id}
                className="border-t"
              >

                <td className="p-4">{item.product}</td>
                <td className="p-4">{item.sku}</td>
                <td className="p-4 font-mono">{item.barcode}</td>
                <td className="p-4">{item.type}</td>

                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {item.status}
                  </span>
                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(item)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onPrint?.(item)}
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

      {/* Footer */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        Generate Barcode → Assign Product → Print Label → Scan → Inventory & Sales Integration
      </div>

    </div>
  );
}
