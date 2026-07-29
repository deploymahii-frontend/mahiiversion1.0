import {
  FiBriefcase,
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiFolder,
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";

export default function PortfolioDashboardPage({
  loading,
  portfolios = [],
  onRefresh,
  onCreate,
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

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiBriefcase />
            Project Portfolio
          </h2>

          <p className="text-gray-500">
            Enterprise project portfolio overview.
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
            onClick={onCreate}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Portfolio
          </button>

        </div>

      </div>

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <FiFolder size={26}/>
          <h3 className="mt-4 font-semibold">Active Projects</h3>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <FiDollarSign size={26}/>
          <h3 className="mt-4 font-semibold">Portfolio Budget</h3>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <FiUsers size={26}/>
          <h3 className="mt-4 font-semibold">Resources</h3>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <FiTrendingUp size={26}/>
          <h3 className="mt-4 font-semibold">Portfolio Health</h3>
        </div>

      </div>

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Portfolio</th>
              <th className="text-center">Projects</th>
              <th className="text-center">Budget</th>
              <th className="text-center">Progress</th>
              <th className="text-center">Owner</th>

            </tr>

          </thead>

          <tbody>

            {portfolios.map((item)=>(

              <tr
                key={item.id}
                className="border-t"
              >

                <td className="p-4">
                  {item.name}
                </td>

                <td className="text-center">
                  {item.projects}
                </td>

                <td className="text-center">
                  {item.budget}
                </td>

                <td className="text-center">
                  {item.progress}%
                </td>

                <td className="text-center">
                  {item.owner}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}
