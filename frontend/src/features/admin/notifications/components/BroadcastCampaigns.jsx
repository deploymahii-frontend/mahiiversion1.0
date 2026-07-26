import {
  FiPlay,
  FiPause,
  FiEdit2,
  FiUsers,
  FiRadio,
  FiCalendar,
} from "react-icons/fi";

const statusStyles = {
  DRAFT: "bg-gray-100 text-gray-700",
  SCHEDULED: "bg-blue-100 text-blue-700",
  RUNNING: "bg-green-100 text-green-700",
  PAUSED: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-purple-100 text-purple-700",
  FAILED: "bg-red-100 text-red-700",
};

export default function BroadcastCampaigns({
  loading,
  campaigns = [],
  onLaunch,
  onPause,
  onEdit,
}) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-72 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Broadcast Campaigns
        </h2>

        <p className="text-gray-500">
          Manage large-scale notification campaigns.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {campaigns.map((campaign) => (

          <div
            key={campaign.id}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h3 className="text-xl font-bold">
                  {campaign.name}
                </h3>

                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    statusStyles[campaign.status]
                  }`}
                >
                  {campaign.status}
                </span>

              </div>

              <FiRadio
                className="text-blue-600"
                size={24}
              />

            </div>

            <div className="space-y-3 text-sm">

              <div className="flex items-center gap-2">
                <FiUsers />
                <span>
                  Audience: {campaign.audience}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FiCalendar />
                <span>
                  Schedule: {campaign.schedule}
                </span>
              </div>

              <div>
                <strong>Channels:</strong>{" "}
                {campaign.channels.join(", ")}
              </div>

              <div>
                <strong>Recipients:</strong>{" "}
                {campaign.recipients.toLocaleString()}
              </div>

              <div>
                <strong>Delivery:</strong>{" "}
                {campaign.deliveryRate}%
              </div>

              <div>
                <strong>Open Rate:</strong>{" "}
                {campaign.openRate}%
              </div>

            </div>

            <div className="mt-6 flex flex-wrap gap-2">

              {campaign.status !== "RUNNING" && (
                <button
                  onClick={() =>
                    onLaunch?.(campaign)
                  }
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  <FiPlay />
                  Launch
                </button>
              )}

              {campaign.status === "RUNNING" && (
                <button
                  onClick={() =>
                    onPause?.(campaign)
                  }
                  className="flex items-center gap-2 rounded-lg bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
                >
                  <FiPause />
                  Pause
                </button>
              )}

              <button
                onClick={() =>
                  onEdit?.(campaign)
                }
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                <FiEdit2 />
                Edit
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
