import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Analytics from './pages/Analytics';
import Customers from './pages/Customers';
import Reviews from './pages/Reviews';
import Discounts from './pages/Discounts';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

export default function ShopDashboardRoutes() {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="orders" element={<Orders />} />
      <Route path="products" element={<Products />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="customers" element={<Customers />} />
      <Route path="reviews" element={<Reviews />} />
      <Route path="discounts" element={<Discounts />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  );
}
