import {
  FiClock,
  FiCalendar,
  FiMail,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiPlay,
} from "react-icons/fi";

export default function ScheduledReportsPage({
  loading,
  schedules = [],
  onRefresh,
  onCreateSchedule,
  onRunNow,
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
            <FiClock />
            Scheduled Reports
          </h2>

          <p className="text-gray-500">
            Automate enterprise reporting and report delivery.
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
            onClick={onCreateSchedule}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Schedule
          </button>

        </div>

      </div>

      {/* Schedule Table */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Report</th>
              <th className="text-center">Frequency</th>
              <th className="text-center">Recipients</th>
              <th className="text-center">Next Run</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {schedules.map(schedule=>(

              <tr
                key={schedule.id}
                className="border-t"
              >

                <td className="p-4 font-medium">
                  {schedule.report}
                </td>

                <td className="text-center">
                  <FiCalendar className="inline mr-1"/>
                  {schedule.frequency}
                </td>

                <td className="text-center">
                  <FiMail className="inline mr-1"/>
                  {schedule.recipients}
                </td>

                <td className="text-center">
                  {schedule.nextRun}
                </td>

                <td className="text-center">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={()=>onView?.(schedule)}
                      className="border rounded p-2"
                    >
                      <FiEye/>
                    </button>

                    <button
                      onClick={()=>onRunNow?.(schedule)}
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

      {/* Summary */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock size={24}/>
          <h3 className="mt-4 font-semibold">Scheduled Reports</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiMail size={24}/>
          <h3 className="mt-4 font-semibold">Email Delivery</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiDownload size={24}/>
          <h3 className="mt-4 font-semibold">Auto Export</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCalendar size={24}/>
          <h3 className="mt-4 font-semibold">Recurring Jobs</h3>
        </div>

      </div>

    </div>

  );

}
