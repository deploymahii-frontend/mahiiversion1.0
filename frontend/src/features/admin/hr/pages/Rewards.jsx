import {
  FiAward,
  FiGift,
  FiStar,
  FiTrendingUp,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiEye,
  FiPlus,
} from "react-icons/fi";

export default function Rewards({
  loading,
  overview = {},
  rewards = [],
  search = "",
  onSearch,
  onRefresh,
  onView,
  onCreateReward,
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
      title: "Rewards Issued",
      value: overview.rewardsIssued ?? 0,
      icon: FiAward,
      color: "bg-blue-500",
    },
    {
      title: "Bonuses",
      value: overview.bonuses ?? 0,
      icon: FiGift,
      color: "bg-green-500",
    },
    {
      title: "Recognitions",
      value: overview.recognitions ?? 0,
      icon: FiStar,
      color: "bg-yellow-500",
    },
    {
      title: "Top Performers",
      value: overview.topPerformers ?? 0,
      icon: FiTrendingUp,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Rewards & Recognition
          </h2>

          <p className="text-gray-500">
            Recognize employee achievements, milestones and incentives.
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

      {/* Search & Action */}
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <div className="flex gap-4">

          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search employee or reward..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

          <button
            onClick={onCreateReward}
            className="rounded-lg bg-indigo-600 px-5 text-white"
          >
            <FiPlus className="mr-2 inline" />
            New Reward
          </button>

        </div>
      </div>

      {/* Rewards Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Reward</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rewards.map((reward) => (
              <tr
                key={reward.id}
                className="border-t"
              >
                <td className="p-4">{reward.employee}</td>
                <td className="p-4">{reward.title}</td>
                <td className="p-4">{reward.category}</td>
                <td className="p-4">{reward.date}</td>

                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {reward.status}
                  </span>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => onView?.(reward)}
                    className="rounded border p-2"
                  >
                    <FiEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Placeholder */}
      <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">
        Employee of the Month • Achievement Badges • Peer Recognition • Bonus History • Milestone Awards
      </div>

    </div>
  );
}
