import { useEffect, useState } from "react";
import * as orderService from "../services/orderService";

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    try {
      setLoading(true);

      const data = await orderService.getMyOrders();

      setOrders(data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return {
    loading,
    orders,
    refresh: loadOrders,
  };
}
