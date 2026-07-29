import {
  FiPackage,
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiEye,
  FiMapPin,
  FiTool,
} from "react-icons/fi";

export default function AssetRegistryPage({
  loading,
  assets = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreateAsset,
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

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiPackage />
            Asset Registry
          </h2>

          <p className="text-gray-500">
            Centralized enterprise asset inventory and lifecycle management.
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
            onClick={onCreateAsset}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Asset
          </button>

        </div>

      </div>

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            className="w-full rounded-lg border py-2 pl-10"
            placeholder="Search assets..."
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
          />

        </div>

      </div>

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Asset</th>
              <th className="text-center">Category</th>
              <th className="text-center">Location</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {assets.map(asset => (

              <tr key={asset.id} className="border-t">

                <td className="p-4 font-medium">
                  {asset.name}
                </td>

                <td className="text-center">
                  {asset.category}
                </td>

                <td className="text-center">
                  <FiMapPin className="inline mr-1"/>
                  {asset.location}
                </td>

                <td className="text-center">
                  {asset.status}
                </td>

                <td className="text-center">

                  <button
                    onClick={()=>onView?.(asset)}
                    className="border rounded p-2"
                  >
                    <FiEye/>
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiPackage size={24}/>
          <h3 className="mt-4 font-semibold">Registered Assets</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTool size={24}/>
          <h3 className="mt-4 font-semibold">Maintenance Due</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiMapPin size={24}/>
          <h3 className="mt-4 font-semibold">Locations</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiPackage size={24}/>
          <h3 className="mt-4 font-semibold">Asset Value</h3>
        </div>

      </div>

    </div>
  );
}
