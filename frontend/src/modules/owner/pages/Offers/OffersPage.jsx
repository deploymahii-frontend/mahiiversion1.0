import OfferTable from "./components/OfferTable";
import OfferToolbar from "./components/OfferToolbar";
import OfferForm from "./components/OfferForm";

import { useOffers } from "./hooks/useOffers";

export default function OffersPage() {

  const {
    offers,
    loading,
  } = useOffers();

  if (loading) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <OfferToolbar />

      <OfferTable
        offers={offers}
      />

      <OfferForm />

    </main>
  );
}
