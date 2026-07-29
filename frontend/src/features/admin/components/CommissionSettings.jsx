import { useEffect, useState } from "react";

const PAYOUT_SCHEDULES = [
  "DAILY",
  "WEEKLY",
  "MONTHLY",
];

export default function CommissionSettings({
  settings = {},
  loading = false,
  onSave,
}) {
  const [form, setForm] = useState({
    platformCommission: 10,
    deliveryCommission: 0,
    minimumPayout: 500,
    payoutSchedule: "WEEKLY",
    allowShopOverrides: true,
  });

  useEffect(() => {
    setForm({
      platformCommission:
        settings.platformCommission ?? 10,
      deliveryCommission:
        settings.deliveryCommission ?? 0,
      minimumPayout:
        settings.minimumPayout ?? 500,
      payoutSchedule:
        settings.payoutSchedule || "WEEKLY",
      allowShopOverrides:
        settings.allowShopOverrides ?? true,
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
      commission: form,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-semibold">
        Commission Settings
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Platform Commission (%)
          </label>

          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={form.platformCommission}
            onChange={(e) =>
              updateField(
                "platformCommission",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Delivery Commission (%)
          </label>

          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={form.deliveryCommission}
            onChange={(e) =>
              updateField(
                "deliveryCommission",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Minimum Payout (₹)
          </label>

          <input
            type="number"
            min="0"
            value={form.minimumPayout}
            onChange={(e) =>
              updateField(
                "minimumPayout",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Payout Schedule
          </label>

          <select
            value={form.payoutSchedule}
            onChange={(e) =>
              updateField(
                "payoutSchedule",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          >
            {PAYOUT_SCHEDULES.map((schedule) => (
              <option key={schedule} value={schedule}>
                {schedule}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
          <input
            id="allowShopOverrides"
            type="checkbox"
            checked={form.allowShopOverrides}
            onChange={(e) =>
              updateField(
                "allowShopOverrides",
                e.target.checked
              )
            }
          />

          <label htmlFor="allowShopOverrides">
            Allow shop-specific commission overrides
          </label>
        </div>

      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Commission Settings"}
        </button>
      </div>
    </form>
  );
}
