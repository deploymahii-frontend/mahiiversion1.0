import { useState } from "react";
import * as orderService from "../services/order.service";

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadOrders() {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getCustomerOrders();
      setOrders(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadOrder(id) {
    try {
      setLoading(true);
      setError(null);
      return await orderService.getOrder(id);
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    orders,
    loading,
    error,
    loadOrders,
    loadOrder,
  };
}
