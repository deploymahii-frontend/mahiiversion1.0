import { useEffect } from "react";

export default function NotificationDetailsModal({
  open,
  notification,
  onClose,
  onMarkAsRead,
  onDelete,
}) {
  useEffect(() => {
    if (
      open &&
      notification &&
      !notification.read
    ) {
      onMarkAsRead?.(notification._id);
    }
  }, [open, notification, onMarkAsRead]);

  if (!open || !notification) return null;

  function handleDelete() {
    const confirmed = window.confirm(
      "Delete this notification?"
    );

    if (!confirmed) return;

    onDelete?.(notification._id);
    onClose?.();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Notification Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        <div className="space-y-5">

          <div>
            <h3 className="text-xl font-semibold">
              {notification.title}
            </h3>

            <p className="mt-2 text-gray-600">
              {notification.message}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <div className="rounded-xl border p-4">
              <p>
                <strong>Type:</strong>{" "}
                {notification.type}
              </p>

              <p className="mt-2">
                <strong>Priority:</strong>{" "}
                {notification.priority}
              </p>

              <p className="mt-2">
                <strong>Status:</strong>{" "}
                {notification.read
                  ? "Read"
                  : "Unread"}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <p>
                <strong>Created:</strong>{" "}
                {new Date(
                  notification.createdAt
                ).toLocaleString()}
              </p>

              <p className="mt-2">
                <strong>Source:</strong>{" "}
                {notification.source || "System"}
              </p>

              <p className="mt-2">
                <strong>Related ID:</strong>{" "}
                {notification.relatedId || "-"}
              </p>
            </div>

          </div>

          {notification.relatedUrl && (
            <div className="rounded-xl border p-4">
              <strong>Related Resource</strong>

              <div className="mt-3">
                <a
                  href={notification.relatedUrl}
                  className="text-orange-600 hover:underline"
                >
                  Open Related Item
                </a>
              </div>
            </div>
          )}

        </div>

        <div className="mt-8 flex justify-between">

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}
