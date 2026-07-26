import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardStats from '../components/DashboardStats';
import SalesChart from '../components/SalesChart';
import RecentOrders from '../components/RecentOrders';
import TopProducts from '../components/TopProducts';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1">
        <Header title="Dashboard" subtitle="Overview of your shop performance" />

        <main className="space-y-6 p-6">
          <DashboardStats />

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <SalesChart />
            <TopProducts />
          </div>

          <RecentOrders />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
