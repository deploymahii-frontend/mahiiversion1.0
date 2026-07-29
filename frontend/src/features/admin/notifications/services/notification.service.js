const MOCK_NOTIFICATIONS = [
  {
    _id: "notif001",
    title: "New Shop Approval Required",
    message: "Shree Mess submitted verification.",
    type: "SHOP",
    priority: "HIGH",
    read: false,
    createdAt: "2026-07-21T12:00:00Z",
  },
];

export async function getNotifications(filters = {}) {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return MOCK_NOTIFICATIONS.filter((notification) => {
    const matchesSearch = filters.search
      ? [
          notification.title,
          notification.message,
          notification.type,
        ]
          .join(" ")
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      : true;

    return matchesSearch;
  });
}

export async function createNotification(payload) {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return {
    _id: `notif_${Date.now()}`,
    read: false,
    createdAt: new Date().toISOString(),
    ...payload,
  };
}
