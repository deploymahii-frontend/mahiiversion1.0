import { useState } from "react";

import NotificationItem from "./NotificationItem";
import NotificationDetailsModal from "./NotificationDetailsModal";

export default function NotificationList({
  notifications = [],
  loading = false,
}) {
  const [selectedNotification, setSelectedNotification] =
    useState(null);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading notifications...
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        {notifications.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No notifications available.
          </div>
        ) : (
          <div className="divide-y">

            {notifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                onView={() =>
                  setSelectedNotification(notification)
                }
              />
            ))}

          </div>
        )}

      </div>

      <NotificationDetailsModal
        open={!!selectedNotification}
        notification={selectedNotification}
        onClose={() =>
          setSelectedNotification(null)
        }
      />
    </>
  );
}
