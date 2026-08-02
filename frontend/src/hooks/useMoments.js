import { useEffect, useState } from "react";
import momentAPI from "../api/moment.api";

export default function useMoments(shopId) {
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shopId) return;

    async function load() {
      try {
        const res = await momentAPI.getShopMoments(shopId);
        setMoments(res?.data?.data || []);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [shopId]);

  return {
    moments,
    loading,
  };
}
