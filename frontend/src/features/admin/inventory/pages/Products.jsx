import {
  FiPackage,
  FiPlus,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEdit,
  FiEye,
  FiTrash2,
} from "react-icons/fi";

export default function Products({
  loading,
  overview = {},
  products = [],
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
      title: "Total Products",
      value: overview.totalProducts ?? 0,
    },
    {
      title: "Active Products",
      value: overview.activeProducts ?? 0,
    },
    {
      title: "Out of Stock",
      value: overview.outOfStock ?? 0,
    },
    {
      title: "Categories",
      value: overview.categories ?? 0,
    },
  ];

  return (
    <div className="space-y-6">

      <div className="rounded-2xl bg-white p-6 shadow-sm flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold">Product Master</h2>
          <p className="text-gray-500">
            Manage products, SKUs, pricing and inventory settings.
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
            <FiDownload className="inline mr-2"/>
            Export
          </button>

          <button
            onClick={onCreate}
            className="bg-indigo-600 text-white rounded-lg px-5"
          >
            <FiPlus className="inline mr-2"/>
            Product
          </button>

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {cards.map(card=>(
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

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="flex gap-4">

          <div className="relative flex-1">

            <FiSearch className="absolute left-3 top-3 text-gray-400"/>

            <input
              value={search}
              onChange={(e)=>onSearch?.(e.target.value)}
              placeholder="Search product..."
              className="w-full border rounded-lg py-2 pl-10 pr-4"
            />

          </div>

          <button className="border rounded-lg px-5">
            <FiFilter className="inline mr-2"/>
            Filter
          </button>

        </div>

      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">SKU</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Cost</th>
              <th className="p-4 text-left">Selling</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {products.map(product=>(

              <tr
                key={product.id}
                className="border-t"
              >

                <td className="p-4">{product.sku}</td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{product.costPrice}</td>
                <td className="p-4">{product.sellingPrice}</td>
                <td className="p-4">{product.stock}</td>

                <td className="p-4">

                  <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm">
                    {product.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={()=>onView?.(product)}
                      className="border rounded p-2"
                    >
                      <FiEye/>
                    </button>

                    <button
                      onClick={()=>onEdit?.(product)}
                      className="border rounded p-2"
                    >
                      <FiEdit/>
                    </button>

                    <button
                      onClick={()=>onDelete?.(product)}
                      className="border rounded p-2 text-red-600"
                    >
                      <FiTrash2/>
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
