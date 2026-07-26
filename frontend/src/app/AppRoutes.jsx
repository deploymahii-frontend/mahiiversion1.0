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

import BusinessDashboard from "@/modules/shop/pages/Dashboard";

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

import ProtectedRoute from "@/routes/ProtectedRoute";
import RoleRoute from "@/routes/RoleRoute";

export default function AppRoutes() {
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

        {/* Shop */}
        <Route
          path="/business/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["shop_owner"]}>
                <BusinessDashboard />
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
      </Routes>
    </BrowserRouter>
  );
}
