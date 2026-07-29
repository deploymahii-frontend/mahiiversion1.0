import ProfileCard from "../components/ProfileCard";
import VehicleCard from "../components/VehicleCard";
import PerformanceCard from "../components/PerformanceCard";

import { useDeliveryProfile } from "../hooks/useDeliveryProfile";

export default function ProfilePage() {
    const { partner } = useDeliveryProfile();

    return (
        <main className="min-h-screen bg-gray-100 p-4 space-y-4">
            <ProfileCard partner={partner} />
            <VehicleCard partner={partner} />
            <PerformanceCard partner={partner} />
        </main>
    );
}
