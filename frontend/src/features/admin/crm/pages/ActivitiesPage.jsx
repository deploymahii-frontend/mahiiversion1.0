import {
  FiActivity,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiPhone,
  FiMail,
  FiUsers,
  FiFileText,
  FiCalendar,
  FiEye,
} from "react-icons/fi";

export default function ActivitiesPage({
  loading,
  activities = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const getIcon = (type) => {
    switch (type) {
      case "Call":
        return <FiPhone className="text-blue-600" />;
      case "Email":
        return <FiMail className="text-green-600" />;
      case "Meeting":
        return <FiUsers className="text-purple-600" />;
      default:
        return <FiFileText className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiActivity />
            Activities
          </h2>

          <p className="text-gray-500">
            Track calls, meetings, emails and customer interactions.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="rounded-lg border p-3"
          >
            <FiRefreshCw />
          </button>

          <button
            onClick={onExport}
            className="rounded-lg bg-green-600 px-5 py-3 text-white"
          >
            <FiDownload className="mr-2 inline" />
            Export
          </button>

          <button
            onClick={onCreate}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
          >
            <FiPlus className="mr-2 inline" />
            New Activity
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="flex gap-4">

          <div className="relative flex-1">

            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search activity..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Timeline */}

      <div className="space-y-4">

        {activities.map((activity) => (

          <div
            key={activity.id}
            className="rounded-2xl bg-white shadow-sm p-5"
          >

            <div className="flex justify-between items-start">

              <div className="flex gap-4">

                <div className="rounded-xl bg-gray-100 p-3">
                  {getIcon(activity.type)}
                </div>

                <div>

                  <h3 className="font-semibold">
                    {activity.subject}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {activity.description}
                  </p>

                  <div className="mt-3 flex gap-6 text-sm text-gray-500">

                    <span>{activity.customer}</span>

                    <span>{activity.owner}</span>

                    <span>
                      <FiCalendar className="inline mr-1" />
                      {activity.date}
                    </span>

                  </div>

                </div>

              </div>

              <button
                onClick={() => onView?.(activity)}
                className="rounded border p-2"
              >
                <FiEye />
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
