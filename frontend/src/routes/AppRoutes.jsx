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
import CreateMoment from '../pages/CreateMoment';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Team from '../pages/Team';
import LoginPage from '../modules/auth/pages/LoginPage';
import SignupPage from '../modules/auth/pages/SignupPage';
import SecureAdminPortal from '../pages/SecureAdminPortal';
import ProtectedRoute from '../core/auth/ProtectedRoute';
import GuestRoute from '../core/auth/GuestRoute';
import ShopDetails from '../features/marketplace/shop/pages/ShopDetails';
import ProductDetails from '../pages/ProductDetails';
import NotFound from '../pages/NotFound';
import OrderSuccess from '../features/orders/pages/OrderSuccess';
import ShopOwnerDashboardRoutes from './ShopOwnerDashboardRoutes';
import AdminDashboard from '../modules/admin/pages/Dashboard';
import SystemSettings from '../modules/admin/system-settings/pages/SystemSettings';
import FeatureFlagsPage from '../modules/admin/feature-flags/pages/FeatureFlags';
import ShopRoutes from '../modules/shop/routes';
import ForbiddenPage from '../pages/ForbiddenPage';
import Unauthorized from '../pages/Unauthorized';
import { ROUTES } from '../core/constants/routes';
import CustomerRoutes from '../modules/customer/routes/index.jsx';

// Admin imports
import AdminLayout from '../modules/admin/components/AdminLayout';
import UsersManagement from '../modules/admin/pages/UsersManagement';

import CategoryManagement from '../modules/admin/pages/CategoryManagement';
import PaymentSettlementManagement from '../modules/admin/pages/PaymentSettlementManagement';
import DisputeResolution from '../modules/admin/pages/DisputeResolution';
import AdminProducts from '../modules/admin/pages/Products';
import AdminServices from '../modules/admin/pages/Services';
import AdminOrders from '../modules/admin/pages/Orders';
import AdminMoments from '../modules/admin/pages/Moments';
import AdminReports from '../modules/admin/pages/Reports';
import AdminCities from '../modules/admin/pages/Cities';
import AdminAnalytics from '../modules/admin/pages/Analytics';
import MyReviews from '../pages/MyReviews';
import AdminReviewModeration from '../modules/admin/components/AdminReviewModeration';

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
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="/reviews" element={<MyReviews />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/create-moment" element={<CreateMoment />} />
          </Route>
        </Route>

        {/* Hidden Secure Admin Portal — only accessible via direct URL */}
        <Route path="/secure-admin-portal" element={<SecureAdminPortal />} />
        {/* Redirect old admin login to the new secure portal */}
        <Route path="/admin/login" element={<SecureAdminPortal />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Default to dashboard if just /admin */}
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UsersManagement />} />

          <Route path="products" element={<AdminProducts />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="reviews" element={<AdminReviewModeration />} />
          <Route path="payments" element={<PaymentSettlementManagement />} />
          <Route path="moments" element={<AdminMoments />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="support" element={<DisputeResolution />} />
          <Route path="cities" element={<AdminCities />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<SystemSettings />} />
          
          <Route path="system-settings" element={<SystemSettings />} />
          <Route path="feature-flags" element={<FeatureFlagsPage />} />
        </Route>
        <Route
           path="/shopowner/*"
            element={
              <ProtectedRoute allowedRoles={["SHOP_OWNER", "SHOPOWNER", "ADMIN", "SUPER_ADMIN"]}>
                <ShopOwnerDashboardRoutes />
              </ProtectedRoute>
            }
        />
        <Route path="/shop/*" element={<ShopRoutes />} />
        <Route
          path="/customer/*"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER", "USER", "ADMIN", "SUPER_ADMIN"]}>
              <CustomerRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
