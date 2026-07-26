import { useEffect, useState } from "react";
import offerAPI from "../api/offer.api";

export default function useOffers(shopId) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shopId) return;

    async function loadOffers() {
      try {
        const res = await offerAPI.getShopOffers(shopId);
        setOffers(res.data || []);
      } finally {
        setLoading(false);
      }
    }

    loadOffers();
  }, [shopId]);

  return {
    offers,
    loading,
  };
}
