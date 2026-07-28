import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ProductsPage from "./products/pages/ProductsPage";
import AddProductPage from "./products/pages/AddProductPage";
import EditProductPage from "./products/pages/EditProductPage";
import InventoryPage from "./inventory/pages/InventoryPage";
import InventoryAnalyticsPage from "./inventory/analytics/pages/InventoryAnalyticsPage";
import CustomersPage from "./customers/pages/CustomersPage";
import CustomerDetailsPage from "./customers/pages/CustomerDetailsPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function ShopRoutes() {
    return (
        <Routes>
            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/orders"
                element={
                    <ProtectedRoute>
                        <OrdersPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/orders/:id"
                element={
                    <ProtectedRoute>
                        <OrderDetailsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/products"
                element={
                    <ProtectedRoute>
                        <ProductsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/products/new"
                element={
                    <ProtectedRoute>
                        <AddProductPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/products/:id"
                element={
                    <ProtectedRoute>
                        <EditProductPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/inventory"
                element={
                    <ProtectedRoute>
                        <InventoryPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/inventory/analytics"
                element={
                    <ProtectedRoute>
                        <InventoryAnalyticsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/customers"
                element={
                    <ProtectedRoute>
                        <CustomersPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/customers/:id"
                element={
                    <ProtectedRoute>
                        <CustomerDetailsPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
