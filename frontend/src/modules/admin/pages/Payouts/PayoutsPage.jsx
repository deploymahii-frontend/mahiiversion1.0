import CommissionSummary from "./components/CommissionSummary";
import PayoutTable from "./components/PayoutTable";
import PayoutRequests from "./components/PayoutRequests";

import { usePayouts } from "./hooks/usePayouts";

export default function PayoutsPage() {

  const {
    payouts,
    summary,
    loading,
  } = usePayouts();

  if (loading) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <CommissionSummary
        summary={summary}
      />

      <PayoutRequests
        requests={payouts.pending}
      />

      <PayoutTable
        payouts={payouts.history}
      />

    </main>
  );
}
