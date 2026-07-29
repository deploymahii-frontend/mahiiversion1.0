import AdminHeader from "../../layout/AdminHeader";
import AdminSidebar from "../../layout/AdminSidebar";

import BillingStatistics from "../components/BillingStatistics";
import RevenueChart from "../components/RevenueChart";
import SubscriptionPlans from "../components/SubscriptionPlans";
import SubscriptionAnalytics from "../components/SubscriptionAnalytics";
import InvoiceTable from "../components/InvoiceTable";
import PaymentHistory from "../components/PaymentHistory";
import CouponManager from "../components/CouponManager";
import RefundRequests from "../components/RefundRequests";

import useBilling from "../hooks/useBilling";

export default function BillingDashboard() {
  const {
    loading,
    statistics,
    revenue,
    plans,
    invoices,
    payments,
    coupons,
    refunds,
    analytics,
    refresh,
  } = useBilling();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <main className="space-y-6 p-6">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                Billing & Subscription
              </h1>

              <p className="text-gray-500">
                Revenue, subscriptions, invoices and financial operations.
              </p>

            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Refresh Dashboard
            </button>

          </div>

          <BillingStatistics
            loading={loading}
            statistics={statistics}
          />

          <RevenueChart
            loading={loading}
            data={revenue}
          />

          <SubscriptionAnalytics
            loading={loading}
            analytics={analytics}
          />

          <SubscriptionPlans
            loading={loading}
            plans={plans}
          />

          <InvoiceTable
            loading={loading}
            invoices={invoices}
          />

          <PaymentHistory
            loading={loading}
            payments={payments}
          />

          <CouponManager
            loading={loading}
            coupons={coupons}
          />

          <RefundRequests
            loading={loading}
            refunds={refunds}
          />

        </main>

      </div>

    </div>
  );
}
