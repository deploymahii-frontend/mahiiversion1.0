import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";

import HealthOverview from "../components/HealthOverview";
import MetricsGrid from "../components/MetricsGrid";
import ServerResources from "../components/ServerResources";
import ApiPerformanceChart from "../components/ApiPerformanceChart";
import QueueStatus from "../components/QueueStatus";
import ActiveIncidents from "../components/ActiveIncidents";

import useSystemMonitoring from "../hooks/useSystemMonitoring";

export default function SystemMonitoring() {
  const {
    health,
    metrics,
    queues,
    incidents,
    apiPerformance,
    loading,
    refresh,
  } = useSystemMonitoring();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <main className="space-y-6 p-6">

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                System Monitoring
              </h1>

              <p className="mt-1 text-gray-500">
                Real-time platform health and infrastructure monitoring.
              </p>
            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
            >
              Refresh
            </button>
          </div>

          <HealthOverview
            loading={loading}
            health={health}
          />

          <MetricsGrid
            loading={loading}
            metrics={metrics}
          />

          <ServerResources
            loading={loading}
            metrics={metrics}
          />

          <ApiPerformanceChart
            loading={loading}
            data={apiPerformance}
          />

          <QueueStatus
            loading={loading}
            queues={queues}
          />

          <ActiveIncidents
            loading={loading}
            incidents={incidents}
          />

        </main>
      </div>
    </div>
  );
}
