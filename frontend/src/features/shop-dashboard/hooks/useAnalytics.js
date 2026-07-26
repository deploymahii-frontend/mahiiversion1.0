import { useCallback, useEffect, useState } from 'react';
import * as analyticsService from '../services/analytics.service';

export default function useAnalytics(shopId = '1') {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await analyticsService.getShopDashboardAnalytics(shopId);
      setAnalytics(data);
    } catch (err) {
      setError(err?.message || 'Unable to load analytics.');
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return {
    analytics,
    loading,
    error,
    refresh: loadAnalytics,
  };
}
