import { useCallback, useEffect, useState } from "react";
import * as permissionService from "../services/permission.service";

export default function usePermissions() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPermissions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await permissionService.getPermissions();
      setPermissions(data);
    } catch (err) {
      setError(err?.message || "Unable to load permissions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPermissions();
  }, [loadPermissions]);

  return {
    permissions,
    loading,
    error,
    refresh: loadPermissions,
  };
}
