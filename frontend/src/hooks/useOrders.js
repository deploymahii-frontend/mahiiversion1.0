import { useEffect, useState } from "react";
import * as orderService from "../services/orderService";

const MOCK_ORDERS = [
  {
    _id: "ord-1001",
    orderNumber: "MAH-89210",
    status: "PREPARING",
    createdAt: new Date().toISOString(),
    totalAmount: 340,
    items: [
      { name: "Special Kat Misal", quantity: 2, price: 120 },
      { name: "Solkadhi Bottle (500ml)", quantity: 1, price: 100 },
    ],
    shop: { name: "Kolhapur Misal House", city: "Rajarampuri" },
    deliveryType: "SHOP_DELIVERY",
    paymentMethod: "UPI_DIRECT",
  },
];

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    try {
      setLoading(true);
      const data = await orderService.getMyOrders();
      setOrders(Array.isArray(data) ? data : MOCK_ORDERS);
    } catch {
      setOrders(MOCK_ORDERS);
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
