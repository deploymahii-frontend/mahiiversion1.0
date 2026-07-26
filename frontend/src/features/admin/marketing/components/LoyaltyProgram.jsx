import {
  FiAward,
  FiUsers,
  FiGift,
  FiStar,
  FiTrendingUp,
  FiSettings,
  FiTarget,
} from "react-icons/fi";

export default function LoyaltyProgram({
  loading,
  statistics = {},
  tiers = [],
  onConfigureRules,
  onManageRewards,
}) {
  if (loading) {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-72 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">

      {/* Loyalty Overview */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-bold">
          Loyalty Overview
        </h2>

        <div className="space-y-4">

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiUsers />
              Active Members
            </span>
            <strong>{statistics.activeMembers ?? 0}</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiTarget />
              Points Issued
            </span>
            <strong>{statistics.pointsIssued ?? 0}</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiGift />
              Rewards Redeemed
            </span>
            <strong>{statistics.rewardsRedeemed ?? 0}</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiTrendingUp />
              Engagement
            </span>
            <strong>{statistics.engagementRate ?? 0}%</strong>
          </div>

        </div>

      </div>

      {/* Membership Tiers */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-bold">
          Membership Tiers
        </h2>

        <div className="space-y-4">

          {tiers.map((tier) => (

            <div
              key={tier.id}
              className="rounded-xl border p-4"
            >

              <div className="mb-2 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <FiAward />

                  <strong>{tier.name}</strong>

                </div>

                <span>{tier.members}</span>

              </div>

              <div className="text-sm text-gray-500">
                Minimum Points: {tier.minimumPoints}
              </div>

              <div className="mt-3 h-2 rounded-full bg-gray-200">

                <div
                  className="h-2 rounded-full bg-yellow-500"
                  style={{
                    width: `${tier.progress}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Actions */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-bold">
          Program Actions
        </h2>

        <div className="space-y-4">

          <button
            onClick={onConfigureRules}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            <FiSettings />
            Configure Rules
          </button>

          <button
            onClick={onManageRewards}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
          >
            <FiStar />
            Reward Catalog
          </button>

        </div>

      </div>

    </div>
  );
}
