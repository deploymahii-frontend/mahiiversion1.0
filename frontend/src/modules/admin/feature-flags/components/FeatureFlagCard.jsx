import {
  FiEdit2,
  FiTrash2,
  FiCopy,
  FiPower,
  FiClock,
  FiUsers,
  FiGlobe,
  FiPercent,
} from "react-icons/fi";

export default function FeatureFlagCard({
  flag,
  onEdit,
  onDelete,
  onDuplicate,
  onToggle,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold">{flag.name}</h2>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                flag.enabled
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {flag.enabled ? "Enabled" : "Disabled"}
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Key: <strong>{flag.key}</strong>
          </p>

          <p className="mt-4 text-gray-600">{flag.description}</p>

          <div className="mt-5 flex flex-wrap gap-5 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FiPercent />
              {flag.rolloutPercentage}%
            </div>

            <div className="flex items-center gap-2">
              <FiClock />
              {flag.environment?.join(", ")}
            </div>

            <div className="flex items-center gap-2">
              <FiUsers />
              {flag.userRoles?.join(", ")}
            </div>

            <div className="flex items-center gap-2">
              <FiGlobe />
              {flag.countries?.join(", ")}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Rollout Progress</span>
              <span>{flag.rolloutPercentage}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${flag.rolloutPercentage}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 lg:w-56 lg:flex-col">
          <button
            onClick={() => onEdit?.(flag)}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <FiEdit2 />
            Edit
          </button>

          <button
            onClick={() => onDuplicate?.(flag)}
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            <FiCopy />
            Duplicate
          </button>

          <button
            onClick={() => onToggle?.(flag)}
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-white ${
              flag.enabled
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <FiPower />
            {flag.enabled ? "Disable" : "Enable"}
          </button>

          <button
            onClick={() => onDelete?.(flag)}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            <FiTrash2 />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
