import { useEffect, useState } from "react";
import {
  getHealth,
  getMetrics,
  getApiPerformance,
  getQueues,
  getIncidents,
} from "../services/monitoring.service";

export default function useSystemMonitoring() {
  const [health, setHealth] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [queues, setQueues] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [apiPerformance, setApiPerformance] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadSystemMonitoring() {
    setLoading(true);

    try {
      const [healthData, metricsData, apiData, queueData, incidentsData] =
        await Promise.all([
          getHealth(),
          getMetrics(),
          getApiPerformance(),
          getQueues(),
          getIncidents(),
        ]);

      setHealth(healthData);
      setMetrics(metricsData);
      setApiPerformance(apiData);
      setQueues(queueData);
      setIncidents(incidentsData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSystemMonitoring();
  }, []);

  return {
    health,
    metrics,
    queues,
    incidents,
    apiPerformance,
    loading,
    refresh: loadSystemMonitoring,
  };
}
