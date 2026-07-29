import {
  FiBriefcase,
  FiUsers,
  FiUserCheck,
  FiClock,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiEye,
  FiEdit,
  FiCalendar,
} from "react-icons/fi";

export default function Recruitment({
  loading,
  overview = {},
  candidates = [],
  search = "",
  onSearch,
  onRefresh,
  onView,
  onEdit,
  onScheduleInterview,
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
      title: "Open Positions",
      value: overview.openPositions ?? 0,
      icon: FiBriefcase,
      color: "bg-blue-500",
    },
    {
      title: "Applicants",
      value: overview.applicants ?? 0,
      icon: FiUsers,
      color: "bg-green-500",
    },
    {
      title: "Interviews",
      value: overview.interviews ?? 0,
      icon: FiClock,
      color: "bg-yellow-500",
    },
    {
      title: "Offers Sent",
      value: overview.offers ?? 0,
      icon: FiUserCheck,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Recruitment
          </h2>

          <p className="text-gray-500">
            Manage hiring, interviews and candidate pipeline.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="rounded-lg border p-3 hover:bg-gray-100"
        >
          <FiRefreshCw />
        </button>
      </div>

      {/* KPI */}
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
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex gap-4">

          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400"/>

            <input
              value={search}
              onChange={(e)=>onSearch?.(e.target.value)}
              placeholder="Search candidate, position or recruiter..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline"/>
            Filter
          </button>

        </div>
      </div>

      {/* Candidate Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Candidate</th>
              <th className="p-4 text-left">Position</th>
              <th className="p-4 text-left">Stage</th>
              <th className="p-4 text-left">Recruiter</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {candidates.map((candidate)=>(
              <tr
                key={candidate.id}
                className="border-t"
              >
                <td className="p-4">{candidate.name}</td>
                <td className="p-4">{candidate.position}</td>
                <td className="p-4">{candidate.stage}</td>
                <td className="p-4">{candidate.recruiter}</td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={()=>onView?.(candidate)}
                      className="rounded border p-2"
                    >
                      <FiEye/>
                    </button>

                    <button
                      onClick={()=>onEdit?.(candidate)}
                      className="rounded border p-2"
                    >
                      <FiEdit/>
                    </button>

                    <button
                      onClick={()=>onScheduleInterview?.(candidate)}
                      className="rounded border p-2"
                    >
                      <FiCalendar/>
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
