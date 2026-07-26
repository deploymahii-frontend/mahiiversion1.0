import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

import GeneralSettings from "../components/GeneralSettings";
import PaymentSettings from "../components/PaymentSettings";
import CommissionSettings from "../components/CommissionSettings";
import NotificationSettings from "../components/NotificationSettings";
import SecuritySettings from "../components/SecuritySettings";
import MaintenanceSettings from "../components/MaintenanceSettings";
import FeatureFlags from "../components/FeatureFlags";

import usePlatformSettings from "../hooks/usePlatformSettings";

export default function Settings() {
  const {
    settings,
    loading,
    saveSettings,
    refresh,
  } = usePlatformSettings();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <main className="space-y-6 p-6">

          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-3xl font-bold">
                Platform Settings
              </h1>

              <p className="mt-1 text-gray-500">
                Configure Mahii platform settings.
              </p>
            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Refresh
            </button>

          </div>

          <GeneralSettings
            settings={settings}
            loading={loading}
            onSave={saveSettings}
          />

          <PaymentSettings
            settings={settings}
            loading={loading}
            onSave={saveSettings}
          />

          <CommissionSettings
            settings={settings}
            loading={loading}
            onSave={saveSettings}
          />

          <NotificationSettings
            settings={settings}
            loading={loading}
            onSave={saveSettings}
          />

          <SecuritySettings
            settings={settings}
            loading={loading}
            onSave={saveSettings}
          />

          <MaintenanceSettings
            settings={settings}
            loading={loading}
            onSave={saveSettings}
          />

          <FeatureFlags
            settings={settings}
            loading={loading}
            onSave={saveSettings}
          />

        </main>

      </div>

    </div>
  );
}
