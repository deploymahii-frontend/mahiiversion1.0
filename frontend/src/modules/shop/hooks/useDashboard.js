import { useEffect, useState } from "react";
import * as dashboardService from "../services/dashboard.service";

export default function useDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await dashboardService.getDashboard();
      const data = res?.data?.data || res?.data;
      setDashboard(data || null);
    } catch {
      setDashboard(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    dashboard,
    loading,
    error,
    refresh: loadDashboard,
  };
}
