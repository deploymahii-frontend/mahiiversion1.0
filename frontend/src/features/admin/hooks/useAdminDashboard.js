import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/admin.service";

export default function useAdminDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    setLoading(true);

    try {
      const data = await getAdminDashboard();
      setDashboard(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    dashboard,
    loading,
    refresh: loadDashboard,
  };
}
