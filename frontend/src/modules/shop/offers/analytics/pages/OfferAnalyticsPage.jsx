import useOfferAnalytics from "../hooks/useOfferAnalytics";

import OfferSummaryCards from "../components/OfferSummaryCards";

import OfferPerformanceTable from "../components/OfferPerformanceTable";

export default function OfferAnalyticsPage() {

    const {

        analytics,

        loading,

    } = useOfferAnalytics();

    if (loading)
        return <>Loading...</>;

    return (

        <div className="p-8 space-y-8">

            <h1 className="text-3xl font-bold">

                Offer Analytics

            </h1>

            <OfferSummaryCards

                analytics={analytics}

            />

            <OfferPerformanceTable

                offers={analytics.offers}

            />

        </div>

    );

}
