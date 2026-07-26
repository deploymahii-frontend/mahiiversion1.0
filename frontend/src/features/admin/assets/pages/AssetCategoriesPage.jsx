import {
  FiTag,
  FiFolder,
  FiLayers,
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiEye,
} from "react-icons/fi";

export default function AssetCategoriesPage({
  loading,
  categories = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreateCategory,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] rounded-xl bg-gray-100 animate-pulse"/>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiTag />
            Asset Categories
          </h2>

          <p className="text-gray-500">
            Organize enterprise assets with standardized classifications.
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
            onClick={onCreateCategory}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Category
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            className="w-full rounded-lg border py-2 pl-10"
            placeholder="Search categories..."
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
          />

        </div>

      </div>

      {/* Categories */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Category</th>
              <th className="text-center">Parent</th>
              <th className="text-center">Assets</th>
              <th className="text-center">Department</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {categories.map(category => (

              <tr key={category.id} className="border-t">

                <td className="p-4 font-medium">
                  <FiFolder className="inline mr-2"/>
                  {category.name}
                </td>

                <td className="text-center">
                  {category.parent || "-"}
                </td>

                <td className="text-center">
                  {category.assetCount}
                </td>

                <td className="text-center">
                  {category.department}
                </td>

                <td className="text-center">

                  <button
                    onClick={()=>onView?.(category)}
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

      {/* Summary */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTag size={24}/>
          <h3 className="mt-4 font-semibold">Categories</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiLayers size={24}/>
          <h3 className="mt-4 font-semibold">Asset Groups</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiFolder size={24}/>
          <h3 className="mt-4 font-semibold">Classification Levels</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTag size={24}/>
          <h3 className="mt-4 font-semibold">Templates</h3>
        </div>

      </div>

    </div>
  );
}
