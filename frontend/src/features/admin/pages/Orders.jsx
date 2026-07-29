import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

import OrderTable from "../components/OrderTable";
import OrderFilters from "../components/OrderFilters";

import useAdminOrders from "../hooks/useAdminOrders";

export default function Orders() {
  const {
    orders,
    loading,
    refresh,
  } = useAdminOrders();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <main className="space-y-6 p-6">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                Orders
              </h1>

              <p className="mt-1 text-gray-500">
                Manage all orders across the Mahii platform.
              </p>

            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Refresh
            </button>

          </div>

          <OrderFilters />

          <OrderTable
            orders={orders}
            loading={loading}
            onRefresh={refresh}
          />

        </main>

      </div>

    </div>
  );
}
