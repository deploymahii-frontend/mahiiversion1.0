import {
  FiDatabase,
  FiRefreshCw,
  FiDownload,
  FiActivity,
  FiLayers,
  FiShield,
  FiClock,
  FiServer,
} from "react-icons/fi";

export default function DataWarehousePage({
  loading,
  sources = [],
  onRefresh,
  onExport,
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
            <FiDatabase />
            Enterprise Data Warehouse
          </h2>

          <p className="text-gray-500">
            Central analytics platform powering BI, AI, dashboards, and reporting.
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
            Export Metadata
          </button>

        </div>

      </div>

      {/* Data Sources */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Data Source</th>
              <th className="text-center">Records</th>
              <th className="text-center">Last Sync</th>
              <th className="text-center">Status</th>
            </tr>

          </thead>

          <tbody>

            {sources.map((source) => (

              <tr key={source.id} className="border-t">

                <td className="p-4 font-medium">
                  {source.name}
                </td>

                <td className="text-center">
                  {source.records}
                </td>

                <td className="text-center">
                  {source.lastSync}
                </td>

                <td className="text-center">
                  {source.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Platform Services */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiDatabase size={24}/>
          <h3 className="mt-4 font-semibold">Warehouse</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiActivity size={24}/>
          <h3 className="mt-4 font-semibold">ETL Pipelines</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiLayers size={24}/>
          <h3 className="mt-4 font-semibold">Data Models</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiShield size={24}/>
          <h3 className="mt-4 font-semibold">Governance</h3>
        </div>

      </div>

      {/* Platform Status */}

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock size={24}/>
          <h3 className="mt-4 font-semibold">
            Real-Time Synchronization
          </h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiServer size={24}/>
          <h3 className="mt-4 font-semibold">
            Analytics Infrastructure
          </h3>
        </div>

      </div>

    </div>
  );
}
