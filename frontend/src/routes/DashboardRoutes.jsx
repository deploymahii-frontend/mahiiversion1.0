import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../dashboard/DashboardLayout';
import DashboardPage from '../features/shop-dashboard/pages/Dashboard';
import OrdersPage from '../features/shop-dashboard/pages/Orders';
import ProductsPage from '../features/shop-dashboard/pages/Products';
import AnalyticsPage from '../features/shop-dashboard/pages/Analytics';
import ProfilePage from '../features/shop-dashboard/pages/Profile';

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
