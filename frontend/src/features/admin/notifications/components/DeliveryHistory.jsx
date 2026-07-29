import {
  FiSearch,
  FiDownload,
  FiMail,
  FiMessageSquare,
  FiBell,
  FiSmartphone,
} from "react-icons/fi";
import { useMemo, useState } from "react";

const channelIcons = {
  EMAIL: FiMail,
  SMS: FiMessageSquare,
  PUSH: FiBell,
  WHATSAPP: FiSmartphone,
};

const statusStyles = {
  DELIVERED: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  OPENED: "bg-blue-100 text-blue-700",
};

export default function DeliveryHistory({
  loading,
  history = [],
  onExport,
}) {
  const [query, setQuery] = useState("");

  const filteredHistory = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return history;

    return history.filter((item) =>
      [
        item.recipient,
        item.channel,
        item.providerResponse,
        item.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }, [history, query]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-80 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            Delivery History
          </h2>
          <p className="text-gray-500">
            Notification delivery audit trail
          </p>
        </div>

        <div className="flex gap-3">

          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button
            onClick={onExport}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <FiDownload />
            Export
          </button>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b text-left">
              <th className="py-3">Recipient</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Delivery Time</th>
              <th>Provider Response</th>
            </tr>

          </thead>

          <tbody>

            {filteredHistory.map((item) => {
              const Icon =
                channelIcons[item.channel] || FiBell;

              return (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-4">
                    {item.recipient}
                  </td>

                  <td>

                    <div className="flex items-center gap-2">

                      <Icon />

                      {item.channel}

                    </div>

                  </td>

                  <td>

                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        statusStyles[item.status]
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td>{item.deliveryTime}</td>

                  <td className="max-w-sm truncate">
                    {item.providerResponse}
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}
