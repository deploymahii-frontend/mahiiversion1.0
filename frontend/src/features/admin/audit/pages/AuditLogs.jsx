import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";

import AuditFilters from "../components/AuditFilters";
import AuditTable from "../components/AuditTable";

import useAuditLogs from "../hooks/useAuditLogs";

export default function AuditLogs() {
  const {
    logs,
    loading,
    filters,
    setFilters,
    refresh,
  } = useAuditLogs();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <main className="space-y-6 p-6">

          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-3xl font-bold">
                Audit Logs
              </h1>

              <p className="mt-1 text-gray-500">
                Track every administrative action.
              </p>
            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
            >
              Refresh
            </button>

          </div>

          <AuditFilters
            filters={filters}
            onChange={setFilters}
          />

          <AuditTable
            logs={logs}
            loading={loading}
          />

        </main>

      </div>

    </div>
  );
}
