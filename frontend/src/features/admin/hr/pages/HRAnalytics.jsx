import {
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiAward,
  FiCalendar,
  FiClock,
  FiRefreshCw,
  FiDownload,
  FiBarChart2,
} from "react-icons/fi";

export default function HRAnalytics({
  loading,
  overview = {},
  onRefresh,
  onExport,
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
      title: "Total Workforce",
      value: overview.totalEmployees ?? 0,
      icon: FiUsers,
      color: "bg-blue-500",
    },
    {
      title: "Monthly Payroll",
      value: overview.monthlyPayroll ?? "₹0",
      icon: FiDollarSign,
      color: "bg-green-500",
    },
    {
      title: "Attrition Rate",
      value: overview.attrition ?? "0%",
      icon: FiTrendingUp,
      color: "bg-red-500",
    },
    {
      title: "Average Performance",
      value: overview.performance ?? "0",
      icon: FiAward,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold">
            HR Analytics
          </h2>

          <p className="text-gray-500">
            Executive workforce insights and strategic HR reporting.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="rounded-lg border p-3"
          >
            <FiRefreshCw/>
          </button>

          <button
            onClick={onExport}
            className="rounded-lg bg-green-600 text-white px-5"
          >
            <FiDownload className="inline mr-2"/>
            Export
          </button>

        </div>

      </div>

      {/* KPI */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card)=>{

          const Icon=card.icon;

          return(

            <div
              key={card.title}
              className="rounded-2xl bg-white shadow-sm p-5"
            >

              <div className="flex justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h3 className="mt-3 text-3xl font-bold">
                    {card.value}
                  </h3>

                </div>

                <div className={`${card.color} rounded-xl p-3 text-white`}>
                  <Icon size={22}/>
                </div>

              </div>

            </div>

          );

        })}

      </div>

      {/* Analytics Grid */}

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-8">
          <h3 className="font-semibold mb-4">
            Workforce Growth
          </h3>

          <div className="h-72 border border-dashed rounded-xl flex items-center justify-center text-gray-400">
            Growth Chart
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-8">
          <h3 className="font-semibold mb-4">
            Payroll Trend
          </h3>

          <div className="h-72 border border-dashed rounded-xl flex items-center justify-center text-gray-400">
            Payroll Chart
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-8">
          <h3 className="font-semibold mb-4">
            Attendance Insights
          </h3>

          <div className="h-72 border border-dashed rounded-xl flex items-center justify-center text-gray-400">
            Attendance Analytics
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-8">
          <h3 className="font-semibold mb-4">
            Leave Analytics
          </h3>

          <div className="h-72 border border-dashed rounded-xl flex items-center justify-center text-gray-400">
            Leave Analytics
          </div>
        </div>

      </div>

      {/* Executive Summary */}

      <div className="rounded-2xl bg-white shadow-sm p-6">

        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiBarChart2/>

          Executive Summary
        </h3>

        <div className="grid gap-5 mt-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="border rounded-xl p-5">
            <FiTrendingUp className="mb-3"/>

            <h4 className="font-semibold">
              Hiring Trend
            </h4>

            <p className="text-gray-500 mt-2">
              Monthly recruitment performance
            </p>

          </div>

          <div className="border rounded-xl p-5">
            <FiCalendar className="mb-3"/>

            <h4 className="font-semibold">
              Leave Utilization
            </h4>

            <p className="text-gray-500 mt-2">
              Annual leave consumption
            </p>

          </div>

          <div className="border rounded-xl p-5">
            <FiClock className="mb-3"/>

            <h4 className="font-semibold">
              Attendance
            </h4>

            <p className="text-gray-500 mt-2">
              Punctuality and overtime
            </p>

          </div>

          <div className="border rounded-xl p-5">
            <FiAward className="mb-3"/>

            <h4 className="font-semibold">
              Performance
            </h4>

            <p className="text-gray-500 mt-2">
              KPI and rating distribution
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
