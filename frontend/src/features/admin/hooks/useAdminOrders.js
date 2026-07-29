import { useEffect, useState } from "react";
import { getAdminOrders } from "../services/adminOrder.service";

export default function useAdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    setLoading(true);

    try {
      const data = await getAdminOrders();
      setOrders(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return {
    orders,
    loading,
    refresh: loadOrders,
  };
}
