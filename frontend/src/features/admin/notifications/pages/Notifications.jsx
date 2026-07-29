import { useState } from "react";

import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";

import NotificationList from "../components/NotificationList";
import NotificationFilters from "../components/NotificationFilters";
import NotificationComposer from "../components/NotificationComposer";

import useNotifications from "../hooks/useNotifications";

export default function Notifications() {
  const {
    notifications,
    loading,
    refresh,
    createNotification,
    filters,
    setFilters,
  } = useNotifications();

  const [showComposer, setShowComposer] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <main className="space-y-6 p-6">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                Notification Center
              </h1>

              <p className="mt-1 text-gray-500">
                Manage platform notifications.
              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={refresh}
                className="rounded-xl border px-5 py-3"
              >
                Refresh
              </button>

              <button
                onClick={() =>
                  setShowComposer(true)
                }
                className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
              >
                New Notification
              </button>

            </div>

          </div>

          <NotificationFilters
            filters={filters}
            onChange={setFilters}
          />

          <NotificationList
            notifications={notifications}
            loading={loading}
          />

          <NotificationComposer
            open={showComposer}
            onClose={() =>
              setShowComposer(false)
            }
            onSubmit={createNotification}
          />

        </main>

      </div>

    </div>
  );
}
