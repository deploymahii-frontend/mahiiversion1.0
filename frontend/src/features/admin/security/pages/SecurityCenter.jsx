import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";

import SecurityOverview from "../components/SecurityOverview";
import LoginActivity from "../components/LoginActivity";
import ActiveSessions from "../components/ActiveSessions";
import TwoFactorManagement from "../components/TwoFactorManagement";
import ApiKeysManager from "../components/ApiKeysManager";
import IpAccessControl from "../components/IpAccessControl";
import ThreatDetection from "../components/ThreatDetection";
import SecurityAuditTimeline from "../components/SecurityAuditTimeline";

import useSecurity from "../hooks/useSecurity";

export default function SecurityCenter() {
  const {
    loading,
    security,
    refresh,
  } = useSecurity();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <main className="space-y-6 p-6">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                Security Center
              </h1>

              <p className="mt-1 text-gray-500">
                Monitor, protect, and manage platform security.
              </p>

            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
            >
              Refresh
            </button>

          </div>

          <SecurityOverview
            loading={loading}
            data={security}
          />

          <LoginActivity
            loading={loading}
            data={security}
          />

          <ActiveSessions
            loading={loading}
            data={security}
          />

          <TwoFactorManagement
            loading={loading}
            data={security}
          />

          <ApiKeysManager
            loading={loading}
            data={security}
          />

          <IpAccessControl
            loading={loading}
            data={security}
          />

          <ThreatDetection
            loading={loading}
            data={security}
          />

          <SecurityAuditTimeline
            loading={loading}
            data={security}
          />

        </main>

      </div>

    </div>
  );
}
