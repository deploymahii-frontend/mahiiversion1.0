import { Routes, Route } from "react-router-dom";

import CustomerLayout from "../layout/CustomerLayout";

import DashboardHome from "../pages/DashboardHome";
import OrdersPage from "../orders/pages/OrdersPage";
import OrderDetailsPage from "../orders/pages/OrderDetailsPage";
import TrackOrderPage from "../orders/pages/TrackOrderPage";
import WishlistPage from "../wishlist/pages/WishlistPage";
import WalletPage from "../wallet/pages/WalletPage";
import RewardsPage from "../rewards/pages/RewardsPage";
import AddressPage from "../addresses/pages/AddressPage";
import NotificationPage from "../notifications/pages/NotificationPage";
import MembershipPage from "../membership/pages/MembershipPage";
import ProfilePage from "../profile/pages/ProfilePage";
import SettingsPage from "../settings/pages/SettingsPage";
import SupportPage from "../support/pages/SupportPage";
import ReviewsPage from "../reviews/pages/ReviewsPage";
import WriteReviewPage from "../reviews/pages/WriteReviewPage";
import PaymentMethodsPage from "../payments/pages/PaymentMethodsPage";
import CouponsPage from "../promotions/pages/CouponsPage";
import ReferralPage from "../referrals/pages/ReferralPage";
import AnalyticsPage from "../analytics/pages/AnalyticsPage";

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>

        <Route index element={<DashboardHome />} />
        <Route path="dashboard" element={<DashboardHome />} />

        {/* Orders */}
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/:id" element={<OrderDetailsPage />} />
        <Route path="orders/:id/track" element={<TrackOrderPage />} />

        {/* Shopping & Discovery */}
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="reviews/write" element={<WriteReviewPage />} />
        <Route path="promotions" element={<CouponsPage />} />

        {/* Finance & Growth */}
        <Route path="wallet" element={<WalletPage />} />
        <Route path="rewards" element={<RewardsPage />} />
        <Route path="membership" element={<MembershipPage />} />
        <Route path="payments" element={<PaymentMethodsPage />} />
        <Route path="referrals" element={<ReferralPage />} />

        {/* Account & Analytics */}
        <Route path="addresses" element={<AddressPage />} />
        <Route path="notifications" element={<NotificationPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />

      </Route>
    </Routes>
  );
}
