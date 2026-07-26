import {
  FiTag,
  FiPlus,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";

export default function Brands({
  loading,
  overview = {},
  brands = [],
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
      title: "Total Brands",
      value: overview.totalBrands ?? 0,
    },
    {
      title: "Active Brands",
      value: overview.activeBrands ?? 0,
    },
    {
      title: "Products",
      value: overview.totalProducts ?? 0,
    },
    {
      title: "Manufacturers",
      value: overview.manufacturers ?? 0,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiTag />
            Brand Management
          </h2>

          <p className="text-gray-500">
            Manage product brands and manufacturers.
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
            <FiDownload className="inline mr-2" />
            Export
          </button>

          <button
            onClick={onCreate}
            className="rounded-lg bg-indigo-600 px-5 text-white"
          >
            <FiPlus className="inline mr-2" />
            Brand
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-white shadow-sm p-5"
          >
            <p className="text-sm text-gray-500">{card.title}</p>
            <h3 className="mt-3 text-3xl font-bold">
              {card.value}
            </h3>
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
              placeholder="Search brand..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="inline mr-2" />
            Filter
          </button>

        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Brand</th>
              <th className="p-4 text-left">Manufacturer</th>
              <th className="p-4 text-left">Products</th>
              <th className="p-4 text-left">Country</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {brands.map((brand) => (
              <tr
                key={brand.id}
                className="border-t"
              >
                <td className="p-4">{brand.name}</td>
                <td className="p-4">{brand.manufacturer}</td>
                <td className="p-4">{brand.productCount}</td>
                <td className="p-4">{brand.country}</td>

                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {brand.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(brand)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(brand)}
                      className="rounded border p-2"
                    >
                      <FiEdit />
                    </button>

                    <button
                      onClick={() => onDelete?.(brand)}
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
