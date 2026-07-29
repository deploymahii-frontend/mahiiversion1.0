import OnlineToggle from "../components/OnlineToggle";
import EarningsCard from "../components/EarningsCard";
import OrderCard from "../components/OrderCard";

import { useDeliveryDashboard } from "../hooks/useDeliveryDashboard";

export default function DashboardPage() {
    const {
        partner,
        activeOrder,
        earnings
    } = useDeliveryDashboard();

    return (
        <main className="min-h-screen bg-gray-100 p-4">
            <OnlineToggle
                online={partner.online}
            />

            <EarningsCard
                earnings={earnings}
            />

            <OrderCard
                order={activeOrder}
            />
        </main>
    );
}
