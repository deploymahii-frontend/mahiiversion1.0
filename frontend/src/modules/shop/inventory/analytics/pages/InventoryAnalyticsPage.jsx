import useInventoryAnalytics from "../hooks/useInventoryAnalytics";
import InventorySummary from "../components/InventorySummary";

export default function InventoryAnalyticsPage() {

    const {

        analytics,

        loading,

    } = useInventoryAnalytics();

    if (loading)
        return <div className="p-8">Loading Analytics...</div>;

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-8">

                Inventory Analytics

            </h1>

            <InventorySummary

                analytics={analytics}

            />

        </div>

    );

}
