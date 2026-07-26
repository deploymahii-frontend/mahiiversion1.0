import {
  FiCpu,
  FiTrendingUp,
  FiAlertTriangle,
  FiRefreshCw,
  FiDownload,
  FiPlay,
  FiActivity,
  FiBarChart2,
} from "react-icons/fi";

export default function AIForecastingPage({
  loading,
  models = [],
  onRefresh,
  onRunForecast,
  onExport,
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
            <FiCpu />
            AI Forecasting
          </h2>

          <p className="text-gray-500">
            Predict future business performance using enterprise data.
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
            Export Forecast
          </button>

        </div>

      </div>

      {/* Models */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Forecast Model</th>
              <th className="text-center">Business Area</th>
              <th className="text-center">Accuracy</th>
              <th className="text-center">Last Run</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {models.map(model => (

              <tr
                key={model.id}
                className="border-t"
              >

                <td className="p-4 font-medium">
                  {model.name}
                </td>

                <td className="text-center">
                  {model.area}
                </td>

                <td className="text-center">
                  {model.accuracy}
                </td>

                <td className="text-center">
                  {model.lastRun}
                </td>

                <td className="text-center">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={()=>onView?.(model)}
                      className="border rounded p-2"
                    >
                      <FiBarChart2/>
                    </button>

                    <button
                      onClick={()=>onRunForecast?.(model)}
                      className="border rounded p-2"
                    >
                      <FiPlay/>
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Forecast Widgets */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp size={24}/>
          <h3 className="mt-4 font-semibold">Revenue Forecast</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiActivity size={24}/>
          <h3 className="mt-4 font-semibold">Demand Forecast</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiAlertTriangle size={24}/>
          <h3 className="mt-4 font-semibold">Anomaly Detection</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCpu size={24}/>
          <h3 className="mt-4 font-semibold">AI Insights</h3>
        </div>

      </div>

    </div>
  );
}
