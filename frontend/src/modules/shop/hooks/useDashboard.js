import { useEffect, useState } from "react";
import * as dashboardService from "../services/dashboard.service";

const MOCK_DASHBOARD = {
  todayOrders: 14,
  todayRevenue: 4850,
  products: 32,
  pendingOrders: 3,
  recentOrders: [
    { id: "ord-101", customer: "Rahul Sharma", total: 450, status: "PENDING", time: "10 mins ago" },
    { id: "ord-102", customer: "Priya Patil", total: 320, status: "PREPARING", time: "25 mins ago" },
    { id: "ord-103", customer: "Amit Deshmukh", total: 890, status: "COMPLETED", time: "1 hour ago" },
  ],
};

export default function useDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await dashboardService.getDashboard();
      const data = res?.data?.data || res?.data;
      if (data) {
        setDashboard(data);
      } else {
        setDashboard(MOCK_DASHBOARD);
      }
    } catch {
      setDashboard(MOCK_DASHBOARD);
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
