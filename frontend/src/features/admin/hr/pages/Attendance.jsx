import {
  FiClock,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiCheckCircle,
} from "react-icons/fi";

export default function Attendance({
  loading,
  overview = {},
  attendance = [],
  search = "",
  onSearch,
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
      title: "Present",
      value: overview.present ?? 0,
      icon: FiCheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Absent",
      value: overview.absent ?? 0,
      icon: FiUsers,
      color: "bg-red-500",
    },
    {
      title: "Late",
      value: overview.late ?? 0,
      icon: FiClock,
      color: "bg-yellow-500",
    },
    {
      title: "Remote",
      value: overview.remote ?? 0,
      icon: FiMapPin,
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Attendance
          </h2>

          <p className="text-gray-500">
            Daily attendance, shifts and employee time tracking.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="rounded-lg border p-3 hover:bg-gray-100"
        >
          <FiRefreshCw />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex justify-between">

                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <h3 className="mt-3 text-3xl font-bold">
                    {card.value}
                  </h3>
                </div>

                <div className={`${card.color} rounded-xl p-3 text-white`}>
                  <Icon size={22} />
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <div className="flex gap-4">

          <div className="relative flex-1">

            <FiSearch className="absolute left-3 top-3 text-gray-400"/>

            <input
              value={search}
              onChange={(e)=>onSearch?.(e.target.value)}
              placeholder="Search employee..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline"/>
            Filter
          </button>

          <button
            onClick={onExport}
            className="rounded-lg bg-green-600 px-5 text-white"
          >
            <FiDownload className="mr-2 inline"/>
            Export
          </button>

        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Check In</th>
              <th className="p-4 text-left">Check Out</th>
              <th className="p-4 text-left">Shift</th>
              <th className="p-4 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {attendance.map((record)=>(
              <tr
                key={record.id}
                className="border-t"
              >
                <td className="p-4">{record.employee}</td>

                <td className="p-4 flex items-center gap-2">
                  <FiCalendar />
                  {record.date}
                </td>

                <td className="p-4">{record.checkIn}</td>
                <td className="p-4">{record.checkOut}</td>
                <td className="p-4">{record.shift}</td>

                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {record.status}
                  </span>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Analytics Placeholder */}
      <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">
        Attendance Trends • Shift Utilization • Overtime • Punctuality
      </div>

    </div>
  );
}
