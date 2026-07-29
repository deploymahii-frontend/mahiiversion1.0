import DeliveryMap from "../components/DeliveryMap";
import DeliveryStatusCard from "../components/DeliveryStatusCard";
import DeliveryActions from "../components/DeliveryActions";

import { useLiveNavigation } from "../hooks/useLiveNavigation";

export default function NavigationPage() {
    const {
        assignment,
        currentLocation,
        destination
    } = useLiveNavigation();

    return (
        <main className="h-screen flex flex-col">
            <DeliveryMap
                currentLocation={currentLocation}
                destination={destination}
            />

            <DeliveryStatusCard
                assignment={assignment}
            />

            <DeliveryActions
                assignment={assignment}
            />
        </main>
    );
}
