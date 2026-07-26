import AdminStats from "../components/AdminStats";
import PendingApprovals from "../components/PendingApprovals";
import PlatformAnalytics from "../components/PlatformAnalytics";
import RecentActivities from "../components/RecentActivities";

import { useAdminDashboard } from "../hooks/useAdminDashboard";

export default function AdminDashboardPage() {

    const {

        dashboard,

        loading

    } = useAdminDashboard();

    if (loading) return <div>Loading...</div>;

    return (

        <main className="min-h-screen bg-gray-100 p-6">

            <AdminStats
                stats={dashboard.stats}
            />

            <PlatformAnalytics
                analytics={dashboard.analytics}
            />

            <PendingApprovals
                shops={dashboard.pendingShops}
            />

            <RecentActivities
                activities={dashboard.activities}
            />

        </main>

    );

}
