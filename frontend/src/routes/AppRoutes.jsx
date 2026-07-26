import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from '../core/auth/ProtectedRoute';
import GuestRoute from '../core/auth/GuestRoute';
import ShopDetails from '../features/marketplace/shop/pages/ShopDetails';
import ProductDetails from '../pages/ProductDetails';
import NotFound from '../pages/NotFound';
import OrderSuccess from '../features/orders/pages/OrderSuccess';
import DashboardRoutes from './DashboardRoutes';
import SystemSettings from '../features/admin/system-settings/pages/SystemSettings';
import FeatureFlagsPage from '../features/admin/feature-flags/pages/FeatureFlags';
import OwnerPortalEntry from '../features/owner/owner-portal/OwnerPortalEntry';
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

          <Route element={<GuestRoute />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGNUP} element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
            <Route path={ROUTES.ORDERS} element={<Orders />} />
            <Route path={`${ROUTES.ORDERS}/:id`} element={<OrderDetails />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
          </Route>
        </Route>
        <Route path="/admin/system-settings" element={<SystemSettings />} />
        <Route path="/admin/feature-flags" element={<FeatureFlagsPage />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="/owner/*" element={<OwnerPortalEntry />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
