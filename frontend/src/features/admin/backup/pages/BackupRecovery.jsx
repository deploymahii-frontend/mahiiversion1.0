import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

import BackupOverview from "../components/BackupOverview";
import BackupHistory from "../components/BackupHistory";
import BackupSchedule from "../components/BackupSchedule";
import BackupStorage from "../components/BackupStorage";
import RestoreCenter from "../components/RestoreCenter";
import DisasterRecovery from "../components/DisasterRecovery";
import BackupHealth from "../components/BackupHealth";

import useBackup from "../hooks/useBackup";

export default function BackupRecovery() {
  const {
    loading,
    backup,
    refresh,
  } = useBackup();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <main className="space-y-6 p-6">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                Backup & Recovery
              </h1>

              <p className="mt-1 text-gray-500">
                Protect platform data and recover from failures.
              </p>

            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Refresh
            </button>

          </div>

          <BackupOverview
            loading={loading}
            data={backup}
          />

          <BackupHealth
            loading={loading}
            data={backup}
          />

          <BackupSchedule
            loading={loading}
            data={backup}
          />

          <BackupStorage
            loading={loading}
            data={backup}
          />

          <BackupHistory
            loading={loading}
            data={backup}
          />

          <RestoreCenter
            loading={loading}
            data={backup}
          />

          <DisasterRecovery
            loading={loading}
            data={backup}
          />

        </main>

      </div>

    </div>
  );
}
