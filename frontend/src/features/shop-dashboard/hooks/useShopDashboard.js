import { useCallback, useEffect, useState } from 'react';
import * as shopDashboardService from '../services/shopDashboard.service';

export function useShopDashboard(shopId = '1') {
  const [overview, setOverview] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [overviewData, orderData, productData] = await Promise.all([
        shopDashboardService.getShopOverview(shopId),
        shopDashboardService.getShopOrders(shopId),
        shopDashboardService.getShopProducts(shopId),
      ]);

      setOverview(overviewData);
      setOrders(Array.isArray(orderData) ? orderData : []);
      setProducts(Array.isArray(productData) ? productData : []);
    } catch (err) {
      setError(err?.message || 'Unable to load shop dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const updateOrder = async (orderId, status) => {
    const updated = await shopDashboardService.updateOrderStatus(orderId, status);
    setOrders((current) =>
      current.map((order) =>
        String(order.id || order.orderId) === String(orderId)
          ? { ...order, status: status, orderStatus: status }
          : order
      )
    );
    return updated;
  };

  return {
    overview,
    orders,
    products,
    loading,
    error,
    refresh: loadDashboard,
    updateOrder,
  };
}

export default useShopDashboard;
