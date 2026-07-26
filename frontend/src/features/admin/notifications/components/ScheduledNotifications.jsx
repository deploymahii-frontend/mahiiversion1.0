import {
  FiCalendar,
  FiClock,
  FiPlay,
  FiPause,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const statusStyles = {
  SCHEDULED: "bg-blue-100 text-blue-700",
  PAUSED: "bg-yellow-100 text-yellow-700",
  RUNNING: "bg-green-100 text-green-700",
  COMPLETED: "bg-purple-100 text-purple-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function ScheduledNotifications({
  loading,
  schedules = [],
  onRunNow,
  onPause,
  onEdit,
  onCancel,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-80 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <FiCalendar size={24} />

        <div>
          <h2 className="text-2xl font-bold">
            Scheduled Notifications
          </h2>

          <p className="text-gray-500">
            Queue and manage future notification deliveries.
          </p>
        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="py-3">Title</th>
              <th>Audience</th>
              <th>Channels</th>
              <th>Send Time</th>
              <th>Status</th>
              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {schedules.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4 font-medium">
                  {item.title}
                </td>

                <td>{item.audience}</td>

                <td>
                  {item.channels.join(", ")}
                </td>

                <td>

                  <div className="flex items-center gap-2">

                    <FiClock />

                    {item.sendTime}

                  </div>

                </td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      statusStyles[item.status]
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    {item.status === "SCHEDULED" && (
                      <button
                        onClick={() =>
                          onRunNow?.(item)
                        }
                        className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                        title="Run Now"
                      >
                        <FiPlay />
                      </button>
                    )}

                    {item.status === "RUNNING" && (
                      <button
                        onClick={() =>
                          onPause?.(item)
                        }
                        className="rounded-lg bg-yellow-600 p-2 text-white hover:bg-yellow-700"
                        title="Pause"
                      >
                        <FiPause />
                      </button>
                    )}

                    <button
                      onClick={() =>
                        onEdit?.(item)
                      }
                      className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={() =>
                        onCancel?.(item)
                      }
                      className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                      title="Cancel"
                    >
                      <FiTrash2 />
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
