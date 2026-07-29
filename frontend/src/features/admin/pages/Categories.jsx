import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

import CategoryTable from "../components/CategoryTable";
import CategoryFilters from "../components/CategoryFilters";

import useAdminCategories from "../hooks/useAdminCategories";

export default function Categories() {
  const {
    categories,
    loading,
    refresh,
  } = useAdminCategories();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <main className="space-y-6 p-6">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                Categories
              </h1>

              <p className="mt-1 text-gray-500">
                Manage all marketplace categories.
              </p>

            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Refresh
            </button>

          </div>

          <CategoryFilters />

          <CategoryTable
            categories={categories}
            loading={loading}
            onRefresh={refresh}
          />

        </main>

      </div>

    </div>
  );
}
