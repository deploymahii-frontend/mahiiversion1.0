import { useEffect, useState } from "react";

const GATEWAYS = [
  "PHONEPE",
  "RAZORPAY",
  "STRIPE",
  "CASHFREE",
  "PAYTM",
];

export default function PaymentSettings({
  settings = {},
  loading = false,
  onSave,
}) {
  const [form, setForm] = useState({
    gateway: "PHONEPE",
    currency: "INR",
    taxPercentage: 0,
    allowCOD: true,
    publicKey: "",
    secretKey: "",
  });

  useEffect(() => {
    setForm({
      gateway: settings.gateway || "PHONEPE",
      currency: settings.currency || "INR",
      taxPercentage: settings.taxPercentage ?? 0,
      allowCOD: settings.allowCOD ?? true,
      publicKey: "",
      secretKey: "",
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
      payment: form,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-semibold">
        Payment Settings
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Payment Gateway
          </label>

          <select
            value={form.gateway}
            onChange={(e) =>
              updateField("gateway", e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          >
            {GATEWAYS.map((gateway) => (
              <option key={gateway} value={gateway}>
                {gateway}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Currency
          </label>

          <input
            type="text"
            value={form.currency}
            onChange={(e) =>
              updateField("currency", e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Tax (%)
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={form.taxPercentage}
            onChange={(e) =>
              updateField(
                "taxPercentage",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div className="flex items-center gap-3 pt-8">
          <input
            id="allowCOD"
            type="checkbox"
            checked={form.allowCOD}
            onChange={(e) =>
              updateField(
                "allowCOD",
                e.target.checked
              )
            }
          />

          <label htmlFor="allowCOD">
            Enable Cash on Delivery
          </label>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Public API Key
          </label>

          <input
            type="password"
            placeholder="Enter new public key"
            value={form.publicKey}
            onChange={(e) =>
              updateField("publicKey", e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Secret API Key
          </label>

          <input
            type="password"
            placeholder="Enter new secret key"
            value={form.secretKey}
            onChange={(e) =>
              updateField("secretKey", e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Payment Settings"}
        </button>
      </div>
    </form>
  );
}
