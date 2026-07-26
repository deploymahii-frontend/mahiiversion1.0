import { useCallback, useEffect, useState } from "react";
import * as securityService from "../services/security.service";

export default function useSecurity() {
  const [security, setSecurity] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSecurity = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await securityService.getAdminSecurity();
      setSecurity(data);
    } catch (err) {
      setError(err?.message || "Unable to load security details.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSecurity();
  }, [loadSecurity]);

  return {
    security,
    loading,
    error,
    refresh: loadSecurity,
  };
}
