import {
  FiAward,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiGift,
  FiEye,
  FiEdit,
} from "react-icons/fi";

export default function LoyaltyProgram({
  loading,
  overview = {},
  members = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
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
    { title: "Members", value: overview.members ?? 0 },
    { title: "Reward Points", value: overview.points ?? 0 },
    { title: "Redeemed", value: overview.redeemed ?? 0 },
    { title: "Active Rewards", value: overview.activeRewards ?? 0 },
  ];

  const tierColor = {
    Silver: "bg-gray-100 text-gray-700",
    Gold: "bg-yellow-100 text-yellow-700",
    Platinum: "bg-indigo-100 text-indigo-700",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiAward />
            Loyalty Program
          </h2>

          <p className="text-gray-500">
            Manage reward points, membership tiers, and customer rewards.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onRefresh} className="rounded-lg border p-3">
            <FiRefreshCw />
          </button>

          <button onClick={onExport} className="rounded-lg bg-green-600 px-5 text-white">
            <FiDownload className="mr-2 inline" />
            Export
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.title} className="rounded-2xl bg-white shadow-sm p-5">
            <p className="text-sm text-gray-500">{card.title}</p>
            <h3 className="mt-3 text-3xl font-bold">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search member..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>
        </div>
      </div>

      {/* Members */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Tier</th>
              <th className="p-4 text-left">Points</th>
              <th className="p-4 text-left">Lifetime Spend</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-t">
                <td className="p-4">{member.name}</td>

                <td className="p-4">
                  <span className={`rounded-full px-3 py-1 text-sm ${tierColor[member.tier]}`}>
                    {member.tier}
                  </span>
                </td>

                <td className="p-4">{member.points}</td>
                <td className="p-4">{member.lifetimeSpend}</td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => onView?.(member)} className="rounded border p-2">
                      <FiEye />
                    </button>

                    <button onClick={() => onEdit?.(member)} className="rounded border p-2">
                      <FiEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        <FiGift className="mx-auto mb-3 text-3xl" />
        Purchase → Earn Points → Tier Upgrade → Redeem Rewards → Repeat Purchase
      </div>
    </div>
  );
}
