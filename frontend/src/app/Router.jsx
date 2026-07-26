import { Routes, Route } from "react-router-dom";

import Home from "@/modules/customer/pages/Home";
import Explore from "@/modules/customer/pages/Explore/Explore";
import BusinessPage from "@/modules/customer/pages/Business/BusinessPage";
import ProductPage from "@/modules/customer/pages/Product/ProductPage";
import Cart from "@/modules/customer/pages/Cart/Cart";
import Checkout from "@/modules/customer/pages/Checkout/Checkout";
import OrderSuccess from "@/modules/customer/pages/OrderSuccess/OrderSuccess";
import Login from "@/modules/auth/pages/Login";
import Signup from "@/modules/auth/pages/Signup";
import CustomerDashboard from "@/modules/customer/pages/Dashboard/Dashboard";
import AdminDashboard from "@/modules/admin/pages/Dashboard/Dashboard";
import DeliveryLogin from "@/modules/delivery/pages/LoginPage";
import DeliveryDashboard from "@/modules/delivery/pages/DashboardPage";
import DeliveryOrders from "@/modules/delivery/pages/OrdersPage";
import DeliveryNavigation from "@/modules/delivery/pages/NavigationPage";
import DeliveryWallet from "@/modules/delivery/pages/WalletPage";
import DeliveryHistory from "@/modules/delivery/pages/HistoryPage";
import DeliveryProfile from "@/modules/delivery/pages/ProfilePage";
import ProtectedRoute from "@/modules/auth/routes/ProtectedRoute";
import PublicRoute from "@/modules/auth/routes/PublicRoute";
import CustomerLayout from "@/layouts/CustomerLayout";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

      <Route element={<CustomerLayout />}>
        <Route path="/explore" element={<Explore />} />
        <Route path="/business/:slug" element={<BusinessPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/dashboard" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
      </Route>

      <Route path="/delivery/login" element={<DeliveryLogin />} />
      <Route path="/delivery/dashboard" element={<ProtectedRoute><DeliveryDashboard /></ProtectedRoute>} />
      <Route path="/delivery/orders" element={<ProtectedRoute><DeliveryOrders /></ProtectedRoute>} />
      <Route path="/delivery/navigation" element={<ProtectedRoute><DeliveryNavigation /></ProtectedRoute>} />
      <Route path="/delivery/wallet" element={<ProtectedRoute><DeliveryWallet /></ProtectedRoute>} />
      <Route path="/delivery/history" element={<ProtectedRoute><DeliveryHistory /></ProtectedRoute>} />
      <Route path="/delivery/profile" element={<ProtectedRoute><DeliveryProfile /></ProtectedRoute>} />

      <Route path="/admin/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/shop/*" element={<ProtectedRoute><div>Shop Dashboard</div></ProtectedRoute>} />
    </Routes>
  );
}
