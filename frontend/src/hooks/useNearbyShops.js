import { useEffect, useState } from "react";
import shopAPI from "../api/shop.api";

export default function useNearbyShops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await shopAPI.getNearby({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });

          setShops(res.data || []);
        } finally {
          setLoading(false);
        }
      },
      () => setLoading(false)
    );
  }, []);

  return { shops, loading };
}
