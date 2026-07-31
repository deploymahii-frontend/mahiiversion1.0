import {
  FiClock,
  FiEdit2,
  FiPlusCircle,
  FiTrash2,
  FiRotateCcw,
  FiPower,
  FiTrendingUp,
} from "react-icons/fi";

const eventIcons = {
  CREATED: FiPlusCircle,
  UPDATED: FiEdit2,
  ENABLED: FiPower,
  DISABLED: FiPower,
  ROLLOUT: FiTrendingUp,
  ROLLBACK: FiRotateCcw,
  DELETED: FiTrash2,
};

export default function FeatureFlagHistory({ history = [], loading }) {
  if (loading) {
    return <div className="rounded-2xl bg-white p-8 shadow-sm">Loading history...</div>;
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <FiClock size={24} />
        <h2 className="text-2xl font-bold">Feature Flag History</h2>
      </div>

      {history.length === 0 ? (
        <div className="py-12 text-center text-gray-500">No history available.</div>
      ) : (
        <div className="space-y-5">
          {history.map((event) => {
            const Icon = eventIcons[event.action] || FiClock;

            return (
              <div key={event.id} className="flex gap-4 rounded-xl border p-5">
                <div className="rounded-full bg-blue-100 p-3 text-blue-700">
                  <Icon size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{event.action}</h3>
                      <p className="text-sm text-gray-500">{event.featureName}</p>
                    </div>

                    <div className="text-sm text-gray-500">{event.createdAt}</div>
                  </div>

                  {event.reason && (
                    <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                      {event.reason}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
                    <div>
                      <strong>User:</strong> {event.user}
                    </div>

                    <div>
                      <strong>Environment:</strong> {event.environment}
                    </div>

                    {event.previousValue !== undefined && (
                      <div>
                        <strong>Previous:</strong> {String(event.previousValue)}
                      </div>
                    )}

                    {event.newValue !== undefined && (
                      <div>
                        <strong>New:</strong> {String(event.newValue)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
