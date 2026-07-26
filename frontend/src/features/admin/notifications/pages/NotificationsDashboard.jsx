import AdminHeader from "../../layout/AdminHeader";
import AdminSidebar from "../../layout/AdminSidebar";

import NotificationStatistics from "../components/NotificationStatistics";
import NotificationCenter from "../components/NotificationCenter";
import BroadcastCampaigns from "../components/BroadcastCampaigns";
import ScheduledNotifications from "../components/ScheduledNotifications";
import NotificationTemplates from "../components/NotificationTemplates";
import DeliveryHistory from "../components/DeliveryHistory";
import NotificationAnalytics from "../components/NotificationAnalytics";
import ChannelHealth from "../components/ChannelHealth";

import useNotifications from "../hooks/useNotifications";

export default function NotificationsDashboard() {
  const {
    loading,
    statistics,
    notifications,
    campaigns,
    schedules,
    templates,
    history,
    analytics,
    channels,
    refresh,
  } = useNotifications();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <main className="space-y-6 p-6">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>

              <h1 className="text-3xl font-bold">
                Notifications & Communication
              </h1>

              <p className="text-gray-500">
                Manage campaigns, templates, broadcasts and delivery analytics.
              </p>

            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Refresh Dashboard
            </button>

          </div>

          <NotificationStatistics
            loading={loading}
            statistics={statistics}
          />

          <NotificationAnalytics
            loading={loading}
            analytics={analytics}
          />

          <ChannelHealth
            loading={loading}
            channels={channels}
          />

          <BroadcastCampaigns
            loading={loading}
            campaigns={campaigns}
          />

          <ScheduledNotifications
            loading={loading}
            schedules={schedules}
          />

          <NotificationTemplates
            loading={loading}
            templates={templates}
          />

          <NotificationCenter
            loading={loading}
            notifications={notifications}
          />

          <DeliveryHistory
            loading={loading}
            history={history}
          />

        </main>

      </div>

    </div>
  );
}
