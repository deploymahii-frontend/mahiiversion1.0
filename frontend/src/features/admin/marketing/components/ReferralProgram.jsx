import {
  FiGift,
  FiUsers,
  FiCheckCircle,
  FiDollarSign,
  FiTrendingUp,
  FiAward,
  FiSettings,
} from "react-icons/fi";

export default function ReferralProgram({
  loading,
  statistics = {},
  topReferrers = [],
  onConfigureRewards,
  onViewAnalytics,
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

      {/* Referral Overview */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-bold">
          Referral Overview
        </h2>

        <div className="space-y-4">

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiUsers />
              Invites Sent
            </span>
            <strong>{statistics.invitesSent ?? 0}</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiCheckCircle />
              Successful Referrals
            </span>
            <strong>{statistics.successfulReferrals ?? 0}</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiDollarSign />
              Rewards Paid
            </span>
            <strong>
              ₹{statistics.rewardsDistributed ?? 0}
            </strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiTrendingUp />
              Conversion
            </span>
            <strong>
              {statistics.conversionRate ?? 0}%
            </strong>
          </div>

        </div>

      </div>

      {/* Top Referrers */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-bold">
          Top Referrers
        </h2>

        <div className="space-y-4">

          {topReferrers.map((user, index) => (

            <div
              key={user.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >

              <div className="flex items-center gap-3">

                <div className="rounded-full bg-yellow-100 p-2 text-yellow-700">
                  <FiAward />
                </div>

                <div>

                  <h3 className="font-semibold">
                    {index + 1}. {user.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {user.referrals} referrals
                  </p>

                </div>

              </div>

              <div className="font-bold">
                ₹{user.reward}
              </div>

            </div>

          ))}

          {topReferrers.length === 0 && (
            <p className="text-gray-500">
              No referral activity yet.
            </p>
          )}

        </div>

      </div>

      {/* Actions */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-bold">
          Program Actions
        </h2>

        <div className="space-y-4">

          <button
            onClick={onConfigureRewards}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            <FiSettings />
            Configure Rewards
          </button>

          <button
            onClick={onViewAnalytics}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
          >
            <FiGift />
            View Referral Analytics
          </button>

        </div>

      </div>

    </div>
  );
}
