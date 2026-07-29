import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import ShopTable from "../components/ShopTable";
import ShopFilters from "../components/ShopFilters";

import useAdminShops from "../hooks/useAdminShops";

export default function Shops() {
  const {
    shops,
    loading,
    refresh,
  } = useAdminShops();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <main className="space-y-6 p-6">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                Shops
              </h1>

              <p className="mt-1 text-gray-500">
                Manage every shop registered on Mahii.
              </p>

            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Refresh
            </button>

          </div>

          <ShopFilters />

          <ShopTable
            shops={shops}
            loading={loading}
            onRefresh={refresh}
          />

        </main>

      </div>

    </div>
  );
}
