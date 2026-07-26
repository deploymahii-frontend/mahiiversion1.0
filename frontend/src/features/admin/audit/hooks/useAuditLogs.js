import { useCallback, useEffect, useState } from "react";
import * as auditService from "../services/audit.service";

export default function useAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    action: "",
    module: "",
    user: "",
  });

  const loadLogs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await auditService.getAuditLogs(filters);
      setLogs(data);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  function updateFilters(nextFilters) {
    setFilters((prev) => ({
      ...prev,
      ...nextFilters,
    }));
  }

  return {
    logs,
    loading,
    filters,
    setFilters: updateFilters,
    refresh: loadLogs,
  };
}
