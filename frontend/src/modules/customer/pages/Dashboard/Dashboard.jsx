import CustomerLayout from "@/layouts/CustomerLayout";
import DashboardHeader from "./components/DashboardHeader";
import QuickActions from "./components/QuickActions";
import OrderCard from "./components/OrderCard";
import WishlistGrid from "./components/WishlistGrid";
import SavedBusinessGrid from "./components/SavedBusinessGrid";
import AddressCard from "./components/AddressCard";
import NotificationList from "./components/NotificationList";
import MomentActivity from "./components/MomentActivity";
import MembershipCard from "./components/MembershipCard";
import AccountMenu from "./components/AccountMenu";

export default function Dashboard() {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <DashboardHeader />
        <QuickActions />
        <OrderCard />
        <WishlistGrid />
        <SavedBusinessGrid />
        <AddressCard />
        <NotificationList />
        <MomentActivity />
        <MembershipCard />
        <AccountMenu />
      </div>
    </CustomerLayout>
  );
}
