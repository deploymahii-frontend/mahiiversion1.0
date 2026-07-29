import { useEffect, useState } from "react";
import { getAdminShops } from "../services/adminShop.service";

export default function useAdminShops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadShops() {
    setLoading(true);

    try {
      const data = await getAdminShops();
      setShops(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadShops();
  }, []);

  return {
    shops,
    loading,
    refresh: loadShops,
  };
}
