import { useEffect, useState } from "react";
import { getShopDashboard } from "../api/dashboard.api";

export function useDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getShopDashboard();
      setDashboard(data);
    } finally {
      setLoading(false);
    }
  }

  return {
    dashboard,
    loading,
    refresh: loadDashboard,
  };
}

export default useDashboard;
