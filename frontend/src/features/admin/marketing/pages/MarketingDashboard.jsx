import AdminHeader from "../../layout/AdminHeader";
import AdminSidebar from "../../layout/AdminSidebar";

import CampaignStatistics from "../components/CampaignStatistics";
import CampaignManager from "../components/CampaignManager";
import CustomerSegments from "../components/CustomerSegments";
import CouponManager from "../components/CouponManager";
import ReferralProgram from "../components/ReferralProgram";
import LoyaltyProgram from "../components/LoyaltyProgram";
import PushNotificationCampaigns from "../components/PushNotificationCampaigns";
import EmailCampaigns from "../components/EmailCampaigns";
import MarketingAnalytics from "../components/MarketingAnalytics";
import GrowthInsights from "../components/GrowthInsights";

import useMarketing from "../hooks/useMarketing";

export default function MarketingDashboard() {

    const {

        loading,

        statistics,

        campaigns,

        coupons,

        segments,

        referrals,

        loyalty,

        pushCampaigns,

        emailCampaigns,

        analytics,

        insights,

        refresh,

    } = useMarketing();

    return (

        <div className="flex min-h-screen bg-gray-100">

            <AdminSidebar />

            <div className="flex-1">

                <AdminHeader />

                <main className="space-y-6 p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <h1 className="text-3xl font-bold">
                                Marketing & Growth
                            </h1>

                            <p className="text-gray-500">
                                Campaigns, customer engagement, referrals,
                                loyalty, coupons and marketing analytics.
                            </p>

                        </div>

                        <button
                            onClick={refresh}
                            className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                        >
                            Refresh Dashboard
                        </button>

                    </div>

                    <CampaignStatistics
                        loading={loading}
                        statistics={statistics}
                    />

                    <MarketingAnalytics
                        loading={loading}
                        analytics={analytics}
                    />

                    <CampaignManager
                        loading={loading}
                        campaigns={campaigns}
                    />

                    <CouponManager
                        loading={loading}
                        coupons={coupons}
                    />

                    <CustomerSegments
                        loading={loading}
                        segments={segments}
                    />

                    <ReferralProgram
                        loading={loading}
                        referrals={referrals}
                    />

                    <LoyaltyProgram
                        loading={loading}
                        loyalty={loyalty}
                    />

                    <PushNotificationCampaigns
                        loading={loading}
                        campaigns={pushCampaigns}
                    />

                    <EmailCampaigns
                        loading={loading}
                        campaigns={emailCampaigns}
                    />

                    <GrowthInsights
                        loading={loading}
                        insights={insights}
                    />

                </main>

            </div>

        </div>

    );

}
