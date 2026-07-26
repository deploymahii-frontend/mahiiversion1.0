import AnalyticsCards from "./components/AnalyticsCards";
import RevenueChart from "./components/RevenueChart";
import TopProducts from "./components/TopProducts";
import PeakHours from "./components/PeakHours";
import CustomerInsights from "./components/CustomerInsights";

import { useAnalytics } from "./hooks/useAnalytics";

export default function AnalyticsPage() {

    const {

        analytics,

        loading

    } = useAnalytics();

    if (loading) return <div>Loading...</div>;

    return (

        <main className="min-h-screen bg-gray-100 p-6">

            <AnalyticsCards
                analytics={analytics}
            />

            <RevenueChart
                revenue={analytics.revenue}
            />

            <TopProducts
                products={analytics.topProducts}
            />

            <PeakHours
                hours={analytics.peakHours}
            />

            <CustomerInsights
                customers={analytics.customers}
            />

        </main>

    );

}
