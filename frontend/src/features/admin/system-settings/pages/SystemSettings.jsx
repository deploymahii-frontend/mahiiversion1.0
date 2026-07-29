import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

import GeneralSettings from "../components/GeneralSettings";
import OrganizationSettings from "../components/OrganizationSettings";
import EmailSettings from "../components/EmailSettings";
import SmsSettings from "../components/SmsSettings";
import PaymentGatewaySettings from "../components/PaymentGatewaySettings";
import StorageSettings from "../components/StorageSettings";
import OAuthSettings from "../components/OAuthSettings";
import LocalizationSettings from "../components/LocalizationSettings";
import MaintenanceMode from "../components/MaintenanceMode";
import EnvironmentSettings from "../components/EnvironmentSettings";

import useSystemSettings from "../hooks/useSystemSettings";

export default function SystemSettings() {
  const {
    loading,
    settings,
    refresh,
  } = useSystemSettings();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <main className="space-y-6 p-6">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                System Settings
              </h1>

              <p className="mt-1 text-gray-500">
                Configure platform-wide settings and integrations.
              </p>

            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Refresh
            </button>

          </div>

          <GeneralSettings
            loading={loading}
            data={settings}
          />

          <OrganizationSettings
            loading={loading}
            data={settings}
          />

          <EmailSettings
            loading={loading}
            data={settings}
          />

          <SmsSettings
            loading={loading}
            data={settings}
          />

          <PaymentGatewaySettings
            loading={loading}
            data={settings}
          />

          <StorageSettings
            loading={loading}
            data={settings}
          />

          <OAuthSettings
            loading={loading}
            data={settings}
          />

          <LocalizationSettings
            loading={loading}
            data={settings}
          />

          <MaintenanceMode
            loading={loading}
            data={settings}
          />

          <EnvironmentSettings
            loading={loading}
            data={settings}
          />

        </main>

      </div>

    </div>
  );
}
