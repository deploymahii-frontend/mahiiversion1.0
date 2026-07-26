import { useEffect, useState } from "react";

const PROVIDERS = [
  "Google",
  "Apple",
  "Facebook",
  "Microsoft",
  "GitHub",
];

export default function OAuthSettings({
  loading,
  data = {},
  onSave,
  onTestProvider,
}) {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const configured =
      data.oauthProviders ||
      PROVIDERS.map((name) => ({
        name,
        enabled: false,
        clientId: "",
        clientSecret: "",
        redirectUri: "",
      }));

    setProviders(configured);
  }, [data]);

  const updateProvider = (index, field, value) => {
    setProviders((prev) =>
      prev.map((provider, i) =>
        i === index
          ? { ...provider, [field]: value }
          : provider
      )
    );
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        Loading OAuth settings...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          OAuth Settings
        </h2>

        <p className="text-gray-500">
          Configure third-party login providers.
        </p>
      </div>

      <div className="space-y-8">

        {providers.map((provider, index) => (

          <div
            key={provider.name}
            className="rounded-xl border p-5"
          >

            <div className="mb-5 flex items-center justify-between">

              <h3 className="text-lg font-semibold">
                {provider.name}
              </h3>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={provider.enabled}
                  onChange={(e) =>
                    updateProvider(
                      index,
                      "enabled",
                      e.target.checked
                    )
                  }
                />

                Enabled
              </label>

            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <div>
                <label className="mb-2 block font-medium">
                  Client ID
                </label>

                <input
                  type="text"
                  value={provider.clientId}
                  onChange={(e) =>
                    updateProvider(
                      index,
                      "clientId",
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Client Secret
                </label>

                <input
                  type="password"
                  value={provider.clientSecret}
                  onChange={(e) =>
                    updateProvider(
                      index,
                      "clientSecret",
                      e.target.value
                    )
                  }
                  placeholder="••••••••••"
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-medium">
                  Redirect URI
                </label>

                <input
                  type="text"
                  value={provider.redirectUri}
                  onChange={(e) =>
                    updateProvider(
                      index,
                      "redirectUri",
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border p-3"
                />
              </div>

            </div>

            <div className="mt-5 flex gap-3">

              <button
                onClick={() =>
                  onTestProvider?.(provider.name)
                }
                className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
              >
                Test Connection
              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-8 flex justify-end">

        <button
          onClick={() => onSave?.(providers)}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Save OAuth Settings
        </button>

      </div>

    </div>
  );
}
