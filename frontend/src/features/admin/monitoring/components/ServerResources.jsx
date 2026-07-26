function ProgressCard({
  title,
  value = 0,
  unit = "%",
  icon,
}) {
  function getColor(percent) {
    if (percent >= 90) return "bg-red-500";
    if (percent >= 75) return "bg-yellow-500";
    return "bg-green-500";
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <div className="mb-4 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <span className="text-3xl">
            {icon}
          </span>

          <h3 className="font-semibold">
            {title}
          </h3>
        </div>

        <span className="text-lg font-bold">
          {value}
          {unit}
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200">

        <div
          className={`h-full rounded-full ${getColor(
            value
          )}`}
          style={{
            width: `${Math.min(value, 100)}%`,
          }}
        />

      </div>

    </div>
  );
}

export default function ServerResources({
  loading,
  metrics = {},
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading server resources...
      </div>
    );
  }

  return (
    <div>

      <h2 className="mb-5 text-2xl font-bold">
        Server Resources
      </h2>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <ProgressCard
          title="CPU Usage"
          icon="🖥️"
          value={metrics.cpuUsage}
        />

        <ProgressCard
          title="Memory Usage"
          icon="🧠"
          value={metrics.memoryUsage}
        />

        <ProgressCard
          title="Disk Usage"
          icon="💾"
          value={metrics.diskUsage}
        />

        <ProgressCard
          title="Network Load"
          icon="🌐"
          value={metrics.networkUsage}
        />

      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">

        <div className="rounded-2xl bg-white p-5 shadow-sm">

          <h3 className="mb-3 font-semibold">
            System Load
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>1 Minute</span>
              <strong>{metrics.load1}</strong>
            </div>

            <div className="flex justify-between">
              <span>5 Minutes</span>
              <strong>{metrics.load5}</strong>
            </div>

            <div className="flex justify-between">
              <span>15 Minutes</span>
              <strong>{metrics.load15}</strong>
            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">

          <h3 className="mb-3 font-semibold">
            Infrastructure
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>Running Containers</span>
              <strong>
                {metrics.containers}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Running Services</span>
              <strong>
                {metrics.services}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Server Nodes</span>
              <strong>
                {metrics.nodes}
              </strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
