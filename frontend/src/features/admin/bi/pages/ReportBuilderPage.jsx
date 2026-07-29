import {
  FiFileText,
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiEye,
  FiFilter,
  FiGrid,
} from "react-icons/fi";

export default function ReportBuilderPage({
  loading,
  reports = [],
  search = "",
  onSearch,
  onRefresh,
  onCreateReport,
  onExport,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100"/>
      </div>
    );
  }

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiFileText />
            Enterprise Report Builder
          </h2>

          <p className="text-gray-500">
            Build custom enterprise reports across every ERP module.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="border rounded-lg p-3"
          >
            <FiRefreshCw/>
          </button>

          <button
            onClick={onExport}
            className="bg-green-600 text-white px-5 rounded-lg"
          >
            <FiDownload className="inline mr-2"/>
            Export
          </button>

          <button
            onClick={onCreateReport}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Report
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
            placeholder="Search reports..."
            className="w-full rounded-lg border py-2 pl-10"
          />

        </div>

      </div>

      {/* Reports */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Report</th>
              <th className="text-center">Module</th>
              <th className="text-center">Created By</th>
              <th className="text-center">Last Run</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {reports.map(report => (

              <tr
                key={report.id}
                className="border-t"
              >

                <td className="p-4 font-medium">
                  {report.name}
                </td>

                <td className="text-center">
                  {report.module}
                </td>

                <td className="text-center">
                  {report.createdBy}
                </td>

                <td className="text-center">
                  {report.lastRun}
                </td>

                <td className="text-center">

                  <button
                    onClick={()=>onView?.(report)}
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

      {/* Builder Features */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiGrid size={24}/>
          <h3 className="mt-4 font-semibold">
            Drag & Drop Builder
          </h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiFilter size={24}/>
          <h3 className="mt-4 font-semibold">
            Advanced Filters
          </h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiDownload size={24}/>
          <h3 className="mt-4 font-semibold">
            Export
          </h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiFileText size={24}/>
          <h3 className="mt-4 font-semibold">
            Saved Reports
          </h3>
        </div>

      </div>

    </div>

  );

}
