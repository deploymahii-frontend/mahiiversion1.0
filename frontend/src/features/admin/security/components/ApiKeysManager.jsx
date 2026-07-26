import { useMemo, useState } from "react";

function ScopeBadge({ scope }) {
  return (
    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
      {scope}
    </span>
  );
}

export default function ApiKeysManager({
  loading,
  data = {},
  onCreateKey,
  onRotateKey,
  onRevokeKey,
}) {
  const [search, setSearch] = useState("");

  const apiKeys = data.apiKeys || [];

  const filteredKeys = useMemo(() => {
    const query = search.toLowerCase();

    return apiKeys.filter((key) => {
      return (
        key.name.toLowerCase().includes(query) ||
        key.owner.toLowerCase().includes(query)
      );
    });
  }, [apiKeys, search]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading API keys...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            API Keys
          </h2>

          <p className="text-gray-500">
            Manage API access and integrations.
          </p>
        </div>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border px-4 py-2"
          />

          <button
            onClick={onCreateKey}
            className="rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600"
          >
            New API Key
          </button>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Owner</th>
              <th className="px-4 py-3 text-left">Scopes</th>
              <th className="px-4 py-3 text-left">Last Used</th>
              <th className="px-4 py-3 text-left">Expires</th>
              <th className="px-4 py-3 text-right">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredKeys.map((key) => (

              <tr
                key={key.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-4 py-4 font-medium">
                  {key.name}
                </td>

                <td className="px-4 py-4">
                  {key.owner}
                </td>

                <td className="px-4 py-4">

                  <div className="flex flex-wrap gap-2">

                    {key.scopes.map((scope) => (
                      <ScopeBadge
                        key={scope}
                        scope={scope}
                      />
                    ))}

                  </div>

                </td>

                <td className="px-4 py-4">
                  {key.lastUsed || "Never"}
                </td>

                <td className="px-4 py-4">
                  {key.expiresAt || "No Expiry"}
                </td>

                <td className="px-4 py-4 text-right">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() =>
                        onRotateKey?.(key.id)
                      }
                      className="rounded-lg border px-3 py-2 hover:bg-gray-100"
                    >
                      Rotate
                    </button>

                    <button
                      onClick={() =>
                        onRevokeKey?.(key.id)
                      }
                      className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                    >
                      Revoke
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
