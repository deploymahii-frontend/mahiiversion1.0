import { Routes, Route, Navigate } from "react-router-dom";
import ShopOwnerLayout from "../components/ShopOwnerLayout";
import ShopOwnerDashboard from "../pages/ShopOwnerDashboard";
import ShopOwnerOrders from "../pages/ShopOwnerOrders";
import ShopOwnerProducts from "../pages/ShopOwnerProducts";
import ShopOwnerInventory from "../pages/ShopOwnerInventory";
import ShopOwnerAnalytics from "../pages/ShopOwnerAnalytics";
import ShopOwnerReviews from "../pages/ShopOwnerReviews";
import ShopOwnerShopProfile from "../pages/ShopOwnerShopProfile";
import ApprovalPending from "../pages/ApprovalPending";

// Light placeholder pages for features in progress
const OffersPage = () => (
  <div className="text-center py-24">
    <p className="text-5xl mb-4">🎁</p>
    <h2 className="text-2xl font-black text-slate-800 dark:text-white">Offers & Promotions</h2>
    <p className="text-slate-400 mt-2">Create discount codes and flash sales for your shop</p>
  </div>
);

const SubscriptionPage = () => (
  <div className="text-center py-24">
    <p className="text-5xl mb-4">👑</p>
    <h2 className="text-2xl font-black text-slate-800 dark:text-white">Mahii Gold for Shops</h2>
    <p className="text-slate-400 mt-2">Upgrade to get priority listing, analytics, and more</p>
  </div>
);

const SettingsPage = () => (
  <div className="text-center py-24">
    <p className="text-5xl mb-4">⚙️</p>
    <h2 className="text-2xl font-black text-slate-800 dark:text-white">Settings</h2>
    <p className="text-slate-400 mt-2">Account, notification, and payment preferences</p>
  </div>
);

export default function ShopOwnerRoutes() {
  return (
    <Routes>
      <Route element={<ShopOwnerLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard"    element={<ShopOwnerDashboard />} />
        <Route path="orders"       element={<ShopOwnerOrders />} />
        <Route path="products"     element={<ShopOwnerProducts />} />
        <Route path="inventory"    element={<ShopOwnerInventory />} />
        <Route path="offers"       element={<OffersPage />} />
        <Route path="analytics"    element={<ShopOwnerAnalytics />} />
        <Route path="reviews"      element={<ShopOwnerReviews />} />
        <Route path="subscription" element={<SubscriptionPage />} />
        <Route path="profile"      element={<ShopOwnerShopProfile />} />
        <Route path="settings"     element={<SettingsPage />} />
        <Route path="approval-pending" element={<ApprovalPending />} />
      </Route>
    </Routes>
  );
}
