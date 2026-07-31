import { useState } from "react";
import {
  FiAlertTriangle,
  FiTrash2,
  FiArchive,
  FiX,
} from "react-icons/fi";

export default function DeleteFeatureFlagDialog({
  flag,
  onClose,
  onDelete,
}) {
  const [reason, setReason] = useState("");
  const [archiveOnly, setArchiveOnly] = useState(true);

  const critical =
    flag?.environments?.includes("Production") &&
    flag?.enabled;

  const handleSubmit = () => {
    onDelete?.({
      id: flag.id,
      archiveOnly,
      reason,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-red-100 p-3">
            <FiAlertTriangle size={26} className="text-red-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Delete Feature Flag</h2>

            <p className="text-gray-500">
              This action should be performed carefully.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-5">
          <div className="grid gap-3">
            <div>
              <strong>Name:</strong> {flag.name}
            </div>

            <div>
              <strong>Key:</strong> {flag.key}
            </div>

            <div>
              <strong>Status:</strong>{" "}
              {flag.enabled ? "Enabled" : "Disabled"}
            </div>

            <div>
              <strong>Environment:</strong>{" "}
              {flag.environments?.join(", ")}
            </div>

            <div>
              <strong>Rollout:</strong>{" "}
              {flag.rolloutPercentage}%
            </div>
          </div>
        </div>

        {critical && (
          <div className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
            <strong>Warning</strong>

            <p className="mt-2">
              This feature is currently active in the Production environment.
            </p>

            <p>Archiving is recommended instead of permanent deletion.</p>
          </div>
        )}

        <div className="mt-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={archiveOnly}
              onChange={(e) => setArchiveOnly(e.target.checked)}
            />
            Archive instead of permanent delete
          </label>
        </div>

        <div className="mt-6">
          <label className="mb-2 block font-medium">Reason</label>

          <textarea
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for deletion..."
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-lg border px-5 py-3"
          >
            <FiX />
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className={`flex items-center gap-2 rounded-lg px-5 py-3 text-white ${
              archiveOnly
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {archiveOnly ? (
              <>
                <FiArchive />
                Archive
              </>
            ) : (
              <>
                <FiTrash2 />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
