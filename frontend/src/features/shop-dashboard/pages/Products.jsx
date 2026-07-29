import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProductTable from "../components/ProductTable";
import ProductFilters from "../components/ProductFilters";
import { Link } from "react-router-dom";
import useShopDashboard from "../hooks/useShopDashboard";

export default function Products() {
  const { products, loading, refreshProducts } = useShopDashboard();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Products</h1>
              <p className="mt-1 text-gray-500">Manage your shop products.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={refreshProducts}
                className="rounded-xl border px-5 py-3 hover:bg-gray-50"
              >
                Refresh
              </button>

              <Link
                to="/shop/products/new"
                className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
              >
                + Add Product
              </Link>
            </div>
          </div>

          <ProductFilters />

          <ProductTable products={products} loading={loading} />
        </main>
      </div>
    </div>
  );
}
