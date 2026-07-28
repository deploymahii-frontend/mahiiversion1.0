import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardCard from "../components/DashboardCard";
import useDashboard from "../hooks/useDashboard";

export default function DashboardPage() {

    const {
        dashboard,
        loading,
    } = useDashboard();

    if (loading) {

        return (
            <div className="h-screen flex items-center justify-center">

                Loading Dashboard...

            </div>
        );

    }

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-gray-100 min-h-screen">

                <Topbar />

                <div className="p-8">

                    <div className="grid lg:grid-cols-4 gap-6">

                        <DashboardCard
                            title="Today's Orders"
                            value={dashboard?.todayOrders ?? 0}
                            color="bg-blue-600"
                        />

                        <DashboardCard
                            title="Today's Revenue"
                            value={`₹${dashboard?.todayRevenue ?? 0}`}
                            color="bg-green-600"
                        />

                        <DashboardCard
                            title="Products"
                            value={dashboard?.products ?? 0}
                            color="bg-orange-500"
                        />

                        <DashboardCard
                            title="Pending Orders"
                            value={dashboard?.pendingOrders ?? 0}
                            color="bg-red-500"
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}
