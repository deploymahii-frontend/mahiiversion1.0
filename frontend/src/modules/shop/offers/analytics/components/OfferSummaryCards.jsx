export default function OfferSummaryCards({

    analytics,

}) {

    return (

        <div className="grid lg:grid-cols-4 gap-6">

            <div className="bg-blue-600 text-white rounded-xl p-6">

                <h3>Total Offers</h3>

                <h1 className="text-3xl font-bold">

                    {analytics.totalOffers}

                </h1>

            </div>

            <div className="bg-green-600 text-white rounded-xl p-6">

                <h3>Total Redemptions</h3>

                <h1 className="text-3xl font-bold">

                    {analytics.redemptions}

                </h1>

            </div>

            <div className="bg-yellow-500 text-white rounded-xl p-6">

                <h3>Revenue Generated</h3>

                <h1 className="text-3xl font-bold">

                    ₹{analytics.revenue}

                </h1>

            </div>

            <div className="bg-purple-600 text-white rounded-xl p-6">

                <h3>Active Offers</h3>

                <h1 className="text-3xl font-bold">

                    {analytics.activeOffers}

                </h1>

            </div>

        </div>

    );

}
