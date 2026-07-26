import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEdit,
  FiEye,
  FiTrash2,
  FiLayers,
} from "react-icons/fi";

export default function Categories({
  loading,
  overview = {},
  categories = [],
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
      title: "Total Categories",
      value: overview.totalCategories ?? 0,
    },
    {
      title: "Parent Categories",
      value: overview.parentCategories ?? 0,
    },
    {
      title: "Sub Categories",
      value: overview.subCategories ?? 0,
    },
    {
      title: "Active",
      value: overview.activeCategories ?? 0,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiLayers />
            Category Management
          </h2>

          <p className="text-gray-500">
            Organize products with parent and child categories.
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
            className="bg-green-600 text-white rounded-lg px-5"
          >
            <FiDownload className="inline mr-2" />
            Export
          </button>

          <button
            onClick={onCreate}
            className="bg-indigo-600 text-white rounded-lg px-5"
          >
            <FiPlus className="inline mr-2" />
            Category
          </button>

        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(card => (
          <div
            key={card.title}
            className="rounded-2xl bg-white shadow-sm p-5"
          >
            <p className="text-sm text-gray-500">{card.title}</p>
            <h3 className="text-3xl font-bold mt-3">
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
              placeholder="Search category..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="inline mr-2" />
            Filter
          </button>

        </div>

      </div>

      {/* Category Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Parent</th>
              <th className="p-4 text-left">Products</th>
              <th className="p-4 text-left">Display Order</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {categories.map(category => (

              <tr
                key={category.id}
                className="border-t"
              >

                <td className="p-4">{category.name}</td>
                <td className="p-4">{category.parent || "-"}</td>
                <td className="p-4">{category.productCount}</td>
                <td className="p-4">{category.displayOrder}</td>

                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {category.status}
                  </span>
                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(category)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(category)}
                      className="rounded border p-2"
                    >
                      <FiEdit />
                    </button>

                    <button
                      onClick={() => onDelete?.(category)}
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
