import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "@/modules/auth/pages/Login";
import Signup from "@/modules/auth/pages/Signup";

import Home from "@/modules/customer/pages/Home";
import Explore from "@/modules/customer/pages/Explore/Explore";
import BusinessPage from "@/modules/customer/pages/Business/BusinessPage";
import ProductPage from "@/modules/customer/pages/Product/ProductPage";
import Cart from "@/modules/customer/pages/Cart/Cart";
import Checkout from "@/modules/customer/pages/Checkout/Checkout";
import OrderSuccess from "@/modules/customer/pages/OrderSuccess/OrderSuccess";

import OwnerDashboard from "@/modules/shopOwner/pages/OwnerDashboard";
import OrdersManagement from "@/modules/shopOwner/pages/OrdersManagement";
import ProductManagement from "@/modules/shopOwner/pages/ProductManagement";
import OffersManagement from "@/modules/shopOwner/pages/OffersManagement";
import InventoryManagement from "@/modules/shopOwner/pages/InventoryManagement";
import ReviewsManagement from "@/modules/shopOwner/pages/ReviewsManagement";
import EarningsDashboard from "@/modules/shopOwner/pages/EarningsDashboard";
import AnalyticsDashboard from "@/modules/shopOwner/pages/AnalyticsDashboard";
import OwnerSettings from "@/modules/shopOwner/pages/OwnerSettings";
import ShopProfileSettings from "@/modules/shopOwner/pages/ShopProfileSettings";

import AdminDashboard from "@/modules/admin/pages/Dashboard/Dashboard";
import Users from "@/modules/admin/pages/Users/Users";
import Businesses from "@/modules/admin/pages/Businesses/Businesses";
import Products from "@/modules/admin/pages/Products/Products";
import Services from "@/modules/admin/pages/Services/Services";
import Orders from "@/modules/admin/pages/Orders/Orders";
import Payments from "@/modules/admin/pages/Payments/Payments";
import Moments from "@/modules/admin/pages/Moments/Moments";
import Reports from "@/modules/admin/pages/Reports/Reports";
import Support from "@/modules/admin/pages/Support/Support";
import Cities from "@/modules/admin/pages/Cities/Cities";
import Categories from "@/modules/admin/pages/Categories/Categories";
import Analytics from "@/modules/admin/pages/Analytics/Analytics";
import Settings from "@/modules/admin/pages/Settings/Settings";

import CustomerRoutes from "@/modules/customer/routes";

import useAuthStore from "@/modules/auth/store/auth.store";
import * as AuthService from "@/modules/auth/services/auth.service";
import ProtectedRoute from "@/routes/ProtectedRoute";
import RoleRoute from "@/routes/RoleRoute";

export default function AppRoutes() {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    const initialize = async () => {
      if (!token) {
        setAuthInitialized(true);
        return;
      }

      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          login(user, token);
          setAuthInitialized(true);
          return;
        } catch (error) {
          localStorage.removeItem("user");
        }
      }

      try {
        const response = await AuthService.getProfile();
        const currentUser = response.data.data;
        login(currentUser, token);
      } catch (error) {
        logout();
      } finally {
        setAuthInitialized(true);
      }
    };

    initialize();
  }, [login, logout]);

  if (!authInitialized) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/business/:slug" element={<BusinessPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* Customer */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["customer"]}>
                <div>Customer Profile</div>
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Shop Owner */}
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["shop_owner"]}>
                <OwnerDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/orders"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["shop_owner"]}>
                <OrdersManagement />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/products"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["shop_owner"]}>
                <ProductManagement />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/offers"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["shop_owner"]}>
                <OffersManagement />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/inventory"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["shop_owner"]}>
                <InventoryManagement />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/reviews"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["shop_owner"]}>
                <ReviewsManagement />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/earnings"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["shop_owner"]}>
                <EarningsDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/analytics"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["shop_owner"]}>
                <AnalyticsDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/settings"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["shop_owner"]}>
                <OwnerSettings />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/profile"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["shop_owner"]}>
                <ShopProfileSettings />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["admin", "super_admin"]}>
                <AdminDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["admin", "super_admin"]}>
                <Users />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/businesses"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["admin", "super_admin"]}>
                <Businesses />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["admin", "super_admin"]}>
                <Products />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["admin", "super_admin"]}>
                <Services />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["admin", "super_admin"]}>
                <Orders />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["admin", "super_admin"]}>
                <Payments />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/moments"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["admin", "super_admin"]}>
                <Moments />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["admin", "super_admin"]}>
                <Reports />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/support"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["admin", "super_admin"]}>
                <Support />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/cities"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["admin", "super_admin"]}>
                <Cities />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["admin", "super_admin"]}>
                <Categories />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["admin", "super_admin"]}>
                <Analytics />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["admin", "super_admin"]}>
                <Settings />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* ─── Customer Application (self-contained module) ─── */}
        <Route
          path="/customer/*"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["customer", "user", "CUSTOMER", "USER", "admin", "ADMIN"]}>
                <CustomerRoutes />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
