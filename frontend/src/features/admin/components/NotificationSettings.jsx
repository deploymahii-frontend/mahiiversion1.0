import { useEffect, useState } from "react";

export default function NotificationSettings({
  settings = {},
  loading = false,
  onSave,
}) {
  const [form, setForm] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingNotifications: false,
    orderUpdates: true,
    promotionalMessages: false,
  });

  useEffect(() => {
    setForm({
      emailNotifications:
        settings.emailNotifications ?? true,
      smsNotifications:
        settings.smsNotifications ?? false,
      pushNotifications:
        settings.pushNotifications ?? true,
      marketingNotifications:
        settings.marketingNotifications ?? false,
      orderUpdates:
        settings.orderUpdates ?? true,
      promotionalMessages:
        settings.promotionalMessages ?? false,
    });
  }, [settings]);

  function updateField(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave?.({
      notifications: form,
    });
  }

  const options = [
    {
      key: "emailNotifications",
      label: "Email Notifications",
    },
    {
      key: "smsNotifications",
      label: "SMS Notifications",
    },
    {
      key: "pushNotifications",
      label: "Push Notifications",
    },
    {
      key: "marketingNotifications",
      label: "Marketing Notifications",
    },
    {
      key: "orderUpdates",
      label: "Order Updates",
    },
    {
      key: "promotionalMessages",
      label: "Promotional Messages",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-semibold">
        Notification Settings
      </h2>

      <div className="space-y-5">
        {options.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
          >
            <span className="font-medium">{item.label}</span>

            <input
              type="checkbox"
              checked={form[item.key]}
              onChange={(e) =>
                updateField(item.key, e.target.checked)
              }
            />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Notification Settings"}
        </button>
      </div>
    </form>
  );
}
