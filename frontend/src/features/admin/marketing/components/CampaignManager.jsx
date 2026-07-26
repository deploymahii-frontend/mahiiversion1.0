import { useMemo, useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiCopy,
  FiPlay,
  FiPause,
  FiStopCircle,
  FiCalendar,
  FiUsers,
  FiBarChart2,
} from "react-icons/fi";

const statusStyles = {
  DRAFT: "bg-gray-100 text-gray-700",
  SCHEDULED: "bg-blue-100 text-blue-700",
  RUNNING: "bg-green-100 text-green-700",
  PAUSED: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-purple-100 text-purple-700",
  STOPPED: "bg-red-100 text-red-700",
};

export default function CampaignManager({
  loading,
  campaigns = [],
  onCreateCampaign,
  onEditCampaign,
  onDuplicateCampaign,
  onLaunchCampaign,
  onPauseCampaign,
  onStopCampaign,
}) {
  const [search, setSearch] = useState("");

  const filteredCampaigns = useMemo(() => {
    if (!search.trim()) return campaigns;

    return campaigns.filter((campaign) =>
      [
        campaign.name,
        campaign.type,
        campaign.audience,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [campaigns, search]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>

          <h2 className="text-2xl font-bold">
            Campaign Manager
          </h2>

          <p className="text-gray-500">
            Create, schedule and manage marketing campaigns.
          </p>

        </div>

        <button
          onClick={onCreateCampaign}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <FiPlus />
          New Campaign
        </button>

      </div>

      <div className="mb-6 relative max-w-md">

        <FiSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          className="w-full rounded-lg border py-2 pl-10 pr-4"
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">Campaign</th>
              <th className="text-left">Type</th>
              <th className="text-left">Audience</th>
              <th className="text-left">Schedule</th>
              <th className="text-left">Status</th>
              <th className="text-left">Performance</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredCampaigns.map((campaign) => (

              <tr
                key={campaign.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4">

                  <div className="font-semibold">
                    {campaign.name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {campaign.description}
                  </div>

                </td>

                <td>{campaign.type}</td>

                <td>

                  <div className="flex items-center gap-2">

                    <FiUsers />

                    {campaign.audience}

                  </div>

                </td>

                <td>

                  <div className="flex items-center gap-2">

                    <FiCalendar />

                    {campaign.schedule}

                  </div>

                </td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      statusStyles[campaign.status]
                    }`}
                  >
                    {campaign.status}
                  </span>

                </td>

                <td>

                  <div className="flex items-center gap-2">

                    <FiBarChart2 />

                    {campaign.conversionRate}% Conversion

                  </div>

                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEditCampaign?.(campaign)}
                      className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={() => onDuplicateCampaign?.(campaign)}
                      className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700"
                      title="Duplicate"
                    >
                      <FiCopy />
                    </button>

                    <button
                      onClick={() => onLaunchCampaign?.(campaign)}
                      className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                      title="Launch"
                    >
                      <FiPlay />
                    </button>

                    <button
                      onClick={() => onPauseCampaign?.(campaign)}
                      className="rounded-lg bg-yellow-600 p-2 text-white hover:bg-yellow-700"
                      title="Pause"
                    >
                      <FiPause />
                    </button>

                    <button
                      onClick={() => onStopCampaign?.(campaign)}
                      className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                      title="Stop"
                    >
                      <FiStopCircle />
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
import { useMemo, useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiCopy,
  FiPlay,
  FiPause,
  FiStopCircle,
  FiCalendar,
  FiUsers,
  FiBarChart2,
} from "react-icons/fi";

const statusStyles = {
  DRAFT: "bg-gray-100 text-gray-700",
  SCHEDULED: "bg-blue-100 text-blue-700",
  RUNNING: "bg-green-100 text-green-700",
  PAUSED: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-purple-100 text-purple-700",
  STOPPED: "bg-red-100 text-red-700",
};

export default function CampaignManager({
  loading,
  campaigns = [],
  onCreateCampaign,
  onEditCampaign,
  onDuplicateCampaign,
  onLaunchCampaign,
  onPauseCampaign,
  onStopCampaign,
}) {
  const [search, setSearch] = useState("");

  const filteredCampaigns = useMemo(() => {
    if (!search.trim()) return campaigns;

    return campaigns.filter((campaign) =>
      [
        campaign.name,
        campaign.type,
        campaign.audience,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [campaigns, search]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>

          <h2 className="text-2xl font-bold">
            Campaign Manager
          </h2>

          <p className="text-gray-500">
            Create, schedule and manage marketing campaigns.
          </p>

        </div>

        <button
          onClick={onCreateCampaign}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <FiPlus />
          New Campaign
        </button>

      </div>

      <div className="mb-6 relative max-w-md">

        <FiSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          className="w-full rounded-lg border py-2 pl-10 pr-4"
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">Campaign</th>
              <th className="text-left">Type</th>
              <th className="text-left">Audience</th>
              <th className="text-left">Schedule</th>
              <th className="text-left">Status</th>
              <th className="text-left">Performance</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredCampaigns.map((campaign) => (

              <tr
                key={campaign.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4">

                  <div className="font-semibold">
                    {campaign.name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {campaign.description}
                  </div>

                </td>

                <td>{campaign.type}</td>

                <td>

                  <div className="flex items-center gap-2">

                    <FiUsers />

                    {campaign.audience}

                  </div>

                </td>

                <td>

                  <div className="flex items-center gap-2">

                    <FiCalendar />

                    {campaign.schedule}

                  </div>

                </td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      statusStyles[campaign.status]
                    }`}
                  >
                    {campaign.status}
                  </span>

                </td>

                <td>

                  <div className="flex items-center gap-2">

                    <FiBarChart2 />

                    {campaign.conversionRate}% Conversion

                  </div>

                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEditCampaign?.(campaign)}
                      className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={() => onDuplicateCampaign?.(campaign)}
                      className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700"
                      title="Duplicate"
                    >
                      <FiCopy />
                    </button>

                    <button
                      onClick={() => onLaunchCampaign?.(campaign)}
                      className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                      title="Launch"
                    >
                      <FiPlay />
                    </button>

                    <button
                      onClick={() => onPauseCampaign?.(campaign)}
                      className="rounded-lg bg-yellow-600 p-2 text-white hover:bg-yellow-700"
                      title="Pause"
                    >
                      <FiPause />
                    </button>

                    <button
                      onClick={() => onStopCampaign?.(campaign)}
                      className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                      title="Stop"
                    >
                      <FiStopCircle />
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
