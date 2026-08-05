import { Routes, Route, Navigate } from "react-router-dom";
import ShopOwnerLayout from "../components/ShopOwnerLayout";
import ShopOwnerDashboard from "../pages/ShopOwnerDashboard";
import ShopOwnerOrders from "../pages/ShopOwnerOrders";
import ShopOwnerProducts from "../pages/ShopOwnerProducts";
import ShopOwnerInventory from "../pages/ShopOwnerInventory";
import ShopOwnerAnalytics from "../pages/ShopOwnerAnalytics";
import ShopOwnerReviews from "../pages/ShopOwnerReviews";
import ShopOwnerShopProfile from "../pages/ShopOwnerShopProfile";
import ShopOwnerOffers from "../pages/ShopOwnerOffers";
import ShopOwnerSubscription from "../pages/ShopOwnerSubscription";
import ShopOwnerSettings from "../pages/ShopOwnerSettings";

export default function ShopOwnerRoutes() {
  return (
    <Routes>
      <Route element={<ShopOwnerLayout />}>
        <Route index element={<ShopOwnerDashboard />} />
        <Route path="dashboard" element={<ShopOwnerDashboard />} />
        <Route path="orders" element={<ShopOwnerOrders />} />
        <Route path="products" element={<ShopOwnerProducts />} />
        <Route path="inventory" element={<ShopOwnerInventory />} />
        <Route path="offers" element={<ShopOwnerOffers />} />
        <Route path="analytics" element={<ShopOwnerAnalytics />} />
        <Route path="reviews" element={<ShopOwnerReviews />} />
        <Route path="subscription" element={<ShopOwnerSubscription />} />
        <Route path="profile" element={<ShopOwnerShopProfile />} />
        <Route path="settings" element={<ShopOwnerSettings />} />
      </Route>
    </Routes>
  );
}
