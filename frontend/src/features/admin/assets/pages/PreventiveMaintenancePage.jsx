import {
  FiCalendar,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiSearch,
  FiEye,
  FiRepeat,
  FiClock,
  FiAlertTriangle,
} from "react-icons/fi";

export default function PreventiveMaintenancePage({
  loading,
  plans = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreatePlan,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] rounded-xl bg-gray-100 animate-pulse"/>
      </div>
    );
  }

  const badge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Upcoming":
        return "bg-blue-100 text-blue-700";
      case "Overdue":
        return "bg-red-100 text-red-700";
      case "Paused":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiCalendar />
            Preventive Maintenance
          </h2>

          <p className="text-gray-500">
            Automate recurring maintenance schedules for enterprise assets.
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
            onClick={onCreatePlan}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Plan
          </button>

        </div>

      </div>

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            className="w-full rounded-lg border py-2 pl-10"
            placeholder="Search maintenance plans..."
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
          />

        </div>

      </div>

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Plan</th>
              <th className="text-center">Asset</th>
              <th className="text-center">Frequency</th>
              <th className="text-center">Next Due</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {plans.map(plan => (

              <tr key={plan.id} className="border-t">

                <td className="p-4 font-medium">
                  {plan.name}
                </td>

                <td className="text-center">
                  {plan.asset}
                </td>

                <td className="text-center">
                  <FiRepeat className="inline mr-1"/>
                  {plan.frequency}
                </td>

                <td className="text-center">
                  <FiClock className="inline mr-1"/>
                  {plan.nextDue}
                </td>

                <td className="text-center">
                  <span className={`rounded-full px-3 py-1 ${badge(plan.status)}`}>
                    {plan.status}
                  </span>
                </td>

                <td className="text-center">
                  <button
                    onClick={() => onView?.(plan)}
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

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCalendar size={24}/>
          <h3 className="mt-4 font-semibold">Maintenance Plans</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiRepeat size={24}/>
          <h3 className="mt-4 font-semibold">Recurring Jobs</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock size={24}/>
          <h3 className="mt-4 font-semibold">Upcoming Tasks</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiAlertTriangle size={24}/>
          <h3 className="mt-4 font-semibold">Overdue Plans</h3>
        </div>

      </div>

    </div>
  );
}
