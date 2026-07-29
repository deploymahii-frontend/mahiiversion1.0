import {
    FiTrendingUp,
    FiDollarSign,
    FiUsers,
    FiTarget,
    FiActivity,
    FiBarChart2,
    FiDownload,
    FiRefreshCw,
} from "react-icons/fi";

export default function MarketingAnalytics({
    loading,
    analytics = {},
    onRefresh,
    onExport,
}) {

    if (loading) {
        return (
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
            </div>
        );
    }

    const cards = [
        {
            title: "Marketing ROI",
            value: `${analytics.roi ?? 0}%`,
            icon: FiTrendingUp,
            color: "bg-green-500",
        },
        {
            title: "Revenue Generated",
            value: `₹${analytics.revenue ?? 0}`,
            icon: FiDollarSign,
            color: "bg-blue-500",
        },
        {
            title: "Customer Acquisition",
            value: analytics.newCustomers ?? 0,
            icon: FiUsers,
            color: "bg-purple-500",
        },
        {
            title: "Conversion Rate",
            value: `${analytics.conversionRate ?? 0}%`,
            icon: FiTarget,
            color: "bg-orange-500",
        },
        {
            title: "Campaign Performance",
            value: analytics.performanceScore ?? 0,
            icon: FiActivity,
            color: "bg-cyan-500",
        },
        {
            title: "Active Channels",
            value: analytics.channels ?? 0,
            icon: FiBarChart2,
            color: "bg-pink-500",
        },
    ];

    return (

        <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-6 flex flex-wrap items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold">
                        Marketing Analytics
                    </h2>

                    <p className="text-gray-500">
                        Executive marketing performance dashboard
                    </p>

                </div>

                <div className="flex gap-3">

                    <button
                        onClick={onRefresh}
                        className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-gray-100"
                    >
                        <FiRefreshCw />
                        Refresh
                    </button>

                    <button
                        onClick={onExport}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        <FiDownload />
                        Export
                    </button>

                </div>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {cards.map((card) => {

                    const Icon = card.icon;

                    return (

                        <div
                            key={card.title}
                            className="rounded-xl border bg-gray-50 p-5"
                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        {card.title}
                                    </p>

                                    <h3 className="mt-3 text-3xl font-bold">
                                        {card.value}
                                    </h3>

                                </div>

                                <div
                                    className={`${card.color} rounded-xl p-3 text-white`}
                                >
                                    <Icon size={22} />
                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

            <div className="mt-8 rounded-xl border border-dashed p-10 text-center">

                <h3 className="text-xl font-semibold">
                    Executive Marketing Charts
                </h3>

                <p className="mt-2 text-gray-500">

                    Revenue Attribution

                    • Campaign ROI

                    • Channel Performance

                    • Acquisition Funnel

                    • Cohort Analysis

                    • Customer Lifetime Value

                    • Marketing Spend

                    • Geographic Performance

                    • Growth Trends

                </p>

            </div>

        </div>

    );

}
