import { useEffect, useState } from "react";

export default function PaymentGatewaySettings({
  loading,
  data = {},
  onSave,
  onTestConnection,
}) {
  const [form, setForm] = useState({
    activeGateway: "PhonePe",
    environment: "Sandbox",
    merchantId: "",
    clientId: "",
    clientSecret: "",
    webhookUrl: "",
    enableUPI: true,
    enableCards: true,
    enableNetBanking: true,
    enableWallets: true,
  });

  useEffect(() => {
    if (data.payment) {
      setForm({
        activeGateway: data.payment.activeGateway || "PhonePe",
        environment: data.payment.environment || "Sandbox",
        merchantId: data.payment.merchantId || "",
        clientId: data.payment.clientId || "",
        clientSecret: "",
        webhookUrl: data.payment.webhookUrl || "",
        enableUPI: data.payment.enableUPI ?? true,
        enableCards: data.payment.enableCards ?? true,
        enableNetBanking: data.payment.enableNetBanking ?? true,
        enableWallets: data.payment.enableWallets ?? true,
      });
    }
  }, [data]);

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        Loading payment gateway settings...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Payment Gateway
        </h2>

        <p className="text-gray-500">
          Configure payment providers and supported payment methods.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Active Gateway
          </label>

          <select
            value={form.activeGateway}
            onChange={(e) =>
              update("activeGateway", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          >
            <option>PhonePe</option>
            <option>Razorpay</option>
            <option>Stripe</option>
            <option>PayPal</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Environment
          </label>

          <select
            value={form.environment}
            onChange={(e) =>
              update("environment", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          >
            <option>Sandbox</option>
            <option>Production</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Merchant ID
          </label>

          <input
            value={form.merchantId}
            onChange={(e) =>
              update("merchantId", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Client ID
          </label>

          <input
            value={form.clientId}
            onChange={(e) =>
              update("clientId", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            Client Secret
          </label>

          <input
            type="password"
            value={form.clientSecret}
            onChange={(e) =>
              update("clientSecret", e.target.value)
            }
            placeholder="••••••••••••"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            Webhook URL
          </label>

          <input
            value={form.webhookUrl}
            onChange={(e) =>
              update("webhookUrl", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

      </div>

      <div className="mt-8">

        <h3 className="mb-4 text-lg font-semibold">
          Supported Payment Methods
        </h3>

        <div className="grid gap-3 md:grid-cols-2">

          {[
            ["enableUPI", "UPI"],
            ["enableCards", "Cards"],
            ["enableNetBanking", "Net Banking"],
            ["enableWallets", "Wallets"],
          ].map(([key, label]) => (
            <label
              key={key}
              className="flex items-center gap-3"
            >
              <input
                type="checkbox"
                checked={form[key]}
                onChange={(e) =>
                  update(key, e.target.checked)
                }
              />
              {label}
            </label>
          ))}

        </div>

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        <button
          onClick={() => onSave?.(form)}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Save Settings
        </button>

        <button
          onClick={() => onTestConnection?.()}
          className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          Test Connection
        </button>

      </div>

    </div>
  );
}
