import { useMemo, useState } from "react";
import {
  FiMail,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiPlay,
  FiPause,
  FiCalendar,
  FiUsers,
  FiBarChart2,
  FiEye,
  FiMousePointer,
} from "react-icons/fi";

const STATUS_STYLES = {
  DRAFT: "bg-gray-100 text-gray-700",
  SCHEDULED: "bg-blue-100 text-blue-700",
  RUNNING: "bg-green-100 text-green-700",
  PAUSED: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-purple-100 text-purple-700",
};

export default function EmailCampaigns({
  loading,
  campaigns = [],
  onCreate,
  onEdit,
  onLaunch,
  onPause,
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return campaigns;

    return campaigns.filter((campaign) =>
      `${campaign.subject} ${campaign.segment}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [campaigns, query]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Email Campaigns
          </h2>

          <p className="text-gray-500">
            Create and manage email marketing campaigns.
          </p>
        </div>

        <button
          onClick={onCreate}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <FiPlus />
          New Campaign
        </button>

      </div>

      <div className="relative mb-6 max-w-md">

        <FiSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search email campaigns..."
          className="w-full rounded-lg border py-2 pl-10 pr-4"
        />

      </div>

      <div className="space-y-4">

        {filtered.map((campaign) => (

          <div
            key={campaign.id}
            className="rounded-xl border p-5"
          >

            <div className="flex justify-between">

              <div>

                <h3 className="font-bold">
                  {campaign.subject}
                </h3>

                <p className="text-sm text-gray-500">
                  {campaign.preview}
                </p>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm ${STATUS_STYLES[campaign.status]}`}
              >
                {campaign.status}
              </span>

            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-6">

              <div className="flex items-center gap-2">
                <FiUsers />
                {campaign.segment}
              </div>

              <div className="flex items-center gap-2">
                <FiCalendar />
                {campaign.schedule}
              </div>

              <div className="flex items-center gap-2">
                <FiMail />
                {campaign.sent}
              </div>

              <div className="flex items-center gap-2">
                <FiEye />
                {campaign.openRate}%
              </div>

              <div className="flex items-center gap-2">
                <FiMousePointer />
                {campaign.clickRate}%
              </div>

              <div className="flex items-center gap-2">
                <FiBarChart2 />
                Bounce {campaign.bounceRate}%
              </div>

            </div>

            <div className="mt-5 flex gap-3">

              <button
                onClick={() => onEdit?.(campaign)}
                className="rounded-lg bg-blue-600 p-2 text-white"
              >
                <FiEdit2 />
              </button>

              <button
                onClick={() => onLaunch?.(campaign)}
                className="rounded-lg bg-green-600 p-2 text-white"
              >
                <FiPlay />
              </button>

              <button
                onClick={() => onPause?.(campaign)}
                className="rounded-lg bg-yellow-600 p-2 text-white"
              >
                <FiPause />
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
