function QueueCard({ queue }) {
  const healthColor =
    queue.health === "HEALTHY"
      ? "bg-green-500"
      : queue.health === "WARNING"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <div className="mb-5 flex items-center justify-between">

        <div>
          <h3 className="text-lg font-semibold">
            {queue.name}
          </h3>

          <p className="text-sm text-gray-500">
            {queue.type}
          </p>
        </div>

        <span
          className={`h-4 w-4 rounded-full ${healthColor}`}
        />

      </div>

      <div className="grid grid-cols-2 gap-4">

        <Metric
          title="Pending"
          value={queue.pending}
        />

        <Metric
          title="Processing"
          value={queue.processing}
        />

        <Metric
          title="Completed"
          value={queue.completed}
        />

        <Metric
          title="Failed"
          value={queue.failed}
        />

        <Metric
          title="Workers"
          value={queue.workers}
        />

        <Metric
          title="Avg Time"
          value={`${queue.avgTime} ms`}
        />

      </div>

    </div>
  );
}

function Metric({
  title,
  value,
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-3">

      <p className="text-xs text-gray-500">
        {title}
      </p>

      <p className="mt-1 text-xl font-bold">
        {value}
      </p>

    </div>
  );
}

export default function QueueStatus({
  loading,
  queues = [],
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading queue status...
      </div>
    );
  }

  return (
    <div>

      <div className="mb-5">

        <h2 className="text-2xl font-bold">
          Queue Status
        </h2>

        <p className="text-gray-500">
          Background workers and job queues.
        </p>

      </div>

      <div className="grid gap-5 lg:grid-cols-2">

        {queues.map((queue) => (

          <QueueCard
            key={queue.name}
            queue={queue}
          />

        ))}

      </div>

    </div>
  );
}
