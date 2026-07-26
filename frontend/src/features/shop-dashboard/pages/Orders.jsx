import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import OrderFilters from "../components/OrderFilters";
import OrderTable from "../components/OrderTable";
import useShopDashboard from "../hooks/useShopDashboard";

export default function Orders() {
  const { orders, loading, refreshOrders } = useShopDashboard();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Orders</h1>
              <p className="mt-1 text-gray-500">Manage all customer orders.</p>
            </div>

            <button
              onClick={refreshOrders}
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Refresh
            </button>
          </div>

          <OrderFilters />

          <OrderTable orders={orders} loading={loading} />
        </main>
      </div>
    </div>
  );
}
