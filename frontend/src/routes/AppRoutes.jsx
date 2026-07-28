import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Home from '../pages/Home';
import Explore from '../pages/Explore';
import Nearby from '../pages/Nearby';
import Moments from '../pages/Moments';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Orders from '../pages/Orders';
import OrderDetails from '../pages/OrderDetails';
import Profile from '../pages/Profile';
import Wallet from '../pages/Wallet';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Team from '../pages/Team';
import LoginPage from '../modules/auth/pages/LoginPage';
import SignupPage from '../modules/auth/pages/SignupPage';
import AdminLogin from '../pages/AdminLogin';
import ProtectedRoute from '../core/auth/ProtectedRoute';
import GuestRoute from '../core/auth/GuestRoute';
import ShopDetails from '../features/marketplace/shop/pages/ShopDetails';
import ProductDetails from '../pages/ProductDetails';
import NotFound from '../pages/NotFound';
import OrderSuccess from '../features/orders/pages/OrderSuccess';
import DashboardRoutes from './DashboardRoutes';
import AdminDashboard from '../modules/admin/pages/Dashboard/Dashboard';
import SystemSettings from '../features/admin/system-settings/pages/SystemSettings';
import FeatureFlagsPage from '../features/admin/feature-flags/pages/FeatureFlags';
import OwnerPortalEntry from '../features/owner/owner-portal/OwnerPortalEntry';
import ShopRoutes from '../modules/shop/routes';
import ForbiddenPage from '../pages/ForbiddenPage';
import Unauthorized from '../pages/Unauthorized';
import { ROUTES } from '../core/constants/routes';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.EXPLORE} element={<Explore />} />
          <Route path="/nearby" element={<Nearby />} />
          <Route path="/moments" element={<Moments />} />
          <Route path="/shop/:slug" element={<ShopDetails />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/orders/success" element={<OrderSuccess />} />

          {/* Institutional & Information Pages */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />

          <Route element={<GuestRoute />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
            <Route path={ROUTES.ORDERS} element={<Orders />} />
            <Route path={`${ROUTES.ORDERS}/:id`} element={<OrderDetails />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path="/wallet" element={<Wallet />} />
          </Route>
        </Route>

        {/* Dedicated Standalone Secret Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/system-settings"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
              <SystemSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/feature-flags"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
              <FeatureFlagsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["SHOP_OWNER", "SHOPOWNER", "ADMIN", "SUPER_ADMIN"]}>
              <DashboardRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="/owner/*" element={<OwnerPortalEntry />} />
        <Route path="/shop/*" element={<ShopRoutes />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
