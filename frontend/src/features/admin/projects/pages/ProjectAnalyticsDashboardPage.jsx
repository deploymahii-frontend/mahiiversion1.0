import {
  FiBarChart2,
  FiTrendingUp,
  FiDollarSign,
  FiClock,
  FiUsers,
  FiFlag,
  FiAlertTriangle,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";

export default function ProjectAnalyticsDashboardPage({
  loading,
  summary = {},
  portfolio = [],
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

  const cards = [
    { icon: FiBarChart2, label: "Active Projects", value: summary.projects },
    { icon: FiDollarSign, label: "Budget Utilization", value: summary.budget },
    { icon: FiClock, label: "Schedule Performance", value: summary.spi },
    { icon: FiTrendingUp, label: "Cost Performance", value: summary.cpi },
    { icon: FiUsers, label: "Resource Utilization", value: summary.resources },
    { icon: FiAlertTriangle, label: "Open Risks", value: summary.risks },
    { icon: FiFlag, label: "Milestones Completed", value: summary.milestones },
  ];

  return (
    <div className="space-y-6">

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiBarChart2 />
            Project Analytics
          </h2>

          <p className="text-gray-500">
            Executive insights across all enterprise projects.
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

        </div>

      </div>

      <div className="grid gap-6 xl:grid-cols-4">

        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white shadow-sm p-6"
          >
            <card.icon size={26}/>
            <h3 className="mt-4 text-sm text-gray-500">
              {card.label}
            </h3>
            <p className="mt-2 text-3xl font-bold">
              {card.value}
            </p>
          </div>
        ))}

      </div>

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Portfolio</th>
              <th className="text-center">Projects</th>
              <th className="text-center">SPI</th>
              <th className="text-center">CPI</th>
              <th className="text-center">Health</th>
            </tr>
          </thead>

          <tbody>

            {portfolio.map(item => (

              <tr key={item.id} className="border-t">

                <td className="p-4 font-medium">
                  {item.name}
                </td>

                <td className="text-center">
                  {item.projects}
                </td>

                <td className="text-center">
                  {item.spi}
                </td>

                <td className="text-center">
                  {item.cpi}
                </td>

                <td className="text-center">
                  {item.health}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
