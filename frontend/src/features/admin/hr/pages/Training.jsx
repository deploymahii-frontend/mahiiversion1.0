import {
  FiBookOpen,
  FiAward,
  FiUsers,
  FiCalendar,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiEye,
  FiEdit,
} from "react-icons/fi";

export default function Training({
  loading,
  overview = {},
  trainings = [],
  search = "",
  onSearch,
  onRefresh,
  onView,
  onEdit,
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
      title: "Active Courses",
      value: overview.activeCourses ?? 0,
      icon: FiBookOpen,
      color: "bg-blue-500",
    },
    {
      title: "Participants",
      value: overview.participants ?? 0,
      icon: FiUsers,
      color: "bg-green-500",
    },
    {
      title: "Certifications",
      value: overview.certifications ?? 0,
      icon: FiAward,
      color: "bg-purple-500",
    },
    {
      title: "Upcoming Sessions",
      value: overview.upcomingSessions ?? 0,
      icon: FiCalendar,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Training & Learning
          </h2>

          <p className="text-gray-500">
            Manage employee learning, certifications and development.
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
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search course or employee..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>
      </div>

      {/* Training Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Trainer</th>
              <th className="p-4 text-left">Participants</th>
              <th className="p-4 text-left">Schedule</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {trainings.map((course) => (
              <tr
                key={course.id}
                className="border-t"
              >
                <td className="p-4">{course.name}</td>
                <td className="p-4">{course.trainer}</td>
                <td className="p-4">{course.participants}</td>
                <td className="p-4">{course.schedule}</td>

                <td className="p-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    {course.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(course)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(course)}
                      className="rounded border p-2"
                    >
                      <FiEdit />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Placeholder */}
      <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">
        Learning Paths • Assessments • Certifications • Skill Matrix • Training Effectiveness
      </div>

    </div>
  );
}
