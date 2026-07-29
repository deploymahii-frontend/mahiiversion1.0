import {
  FiMail,
  FiMessageSquare,
  FiBell,
  FiGlobe,
  FiSmartphone,
  FiActivity,
} from "react-icons/fi";

const channelIcons = {
  EMAIL: FiMail,
  SMS: FiMessageSquare,
  PUSH: FiBell,
  WHATSAPP: FiSmartphone,
  IN_APP: FiActivity,
  WEB: FiGlobe,
};

const healthColors = {
  HEALTHY: "bg-green-100 text-green-700",
  DEGRADED: "bg-yellow-100 text-yellow-700",
  DOWN: "bg-red-100 text-red-700",
};

export default function ChannelHealth({
  loading,
  channels = [],
}) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Channel Health
        </h2>

        <p className="text-gray-500">
          Monitor the operational status of every communication channel.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {channels.map((channel) => {
          const Icon =
            channelIcons[channel.type] || FiActivity;

          return (
            <div
              key={channel.type}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >

              <div className="mb-5 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {channel.name}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        healthColors[channel.status]
                      }`}
                    >
                      {channel.status}
                    </span>
                  </div>

                </div>

              </div>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span>Success Rate</span>
                  <strong>{channel.successRate}%</strong>
                </div>

                <div className="flex justify-between">
                  <span>Latency</span>
                  <strong>{channel.latency} ms</strong>
                </div>

                <div className="flex justify-between">
                  <span>Error Count</span>
                  <strong>{channel.errorCount}</strong>
                </div>

                <div className="flex justify-between">
                  <span>Health Score</span>
                  <strong>{channel.healthScore}%</strong>
                </div>

                <div className="flex justify-between">
                  <span>Last Check</span>
                  <strong>{channel.lastChecked}</strong>
                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}
