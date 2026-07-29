import { useEffect, useState } from "react";

const INITIAL_FORM = {
  title: "",
  message: "",
  type: "SYSTEM",
  priority: "MEDIUM",
  audience: "ALL",
  scheduledAt: "",
};

const TYPES = [
  "SYSTEM",
  "ORDER",
  "PAYMENT",
  "SHOP",
  "USER",
  "SECURITY",
  "PROMOTION",
  "MAINTENANCE",
];

const PRIORITIES = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
];

const AUDIENCES = [
  "ALL",
  "CUSTOMERS",
  "SHOP_OWNERS",
  "DELIVERY_PARTNERS",
  "ADMINS",
];

export default function NotificationComposer({
  open,
  loading = false,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(INITIAL_FORM);

  useEffect(() => {
    if (open) {
      setForm(INITIAL_FORM);
    }
  }, [open]);

  if (!open) return null;

  function updateField(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Create Notification
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              updateField("title", e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
            required
          />

          <textarea
            rows={5}
            placeholder="Notification message..."
            value={form.message}
            onChange={(e) =>
              updateField("message", e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
            required
          />

          <div className="grid gap-4 md:grid-cols-2">

            <select
              value={form.type}
              onChange={(e) =>
                updateField("type", e.target.value)
              }
              className="rounded-xl border border-gray-300 px-4 py-3"
            >
              {TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={form.priority}
              onChange={(e) =>
                updateField("priority", e.target.value)
              }
              className="rounded-xl border border-gray-300 px-4 py-3"
            >
              {PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>

            <select
              value={form.audience}
              onChange={(e) =>
                updateField("audience", e.target.value)
              }
              className="rounded-xl border border-gray-300 px-4 py-3"
            >
              {AUDIENCES.map((audience) => (
                <option key={audience} value={audience}>
                  {audience.replaceAll("_", " ")}
                </option>
              ))}
            </select>

            <input
              type="datetime-local"
              value={form.scheduledAt}
              onChange={(e) =>
                updateField("scheduledAt", e.target.value)
              }
              className="rounded-xl border border-gray-300 px-4 py-3"
            />

          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Notification"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
