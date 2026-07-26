import { useCallback, useEffect, useState } from "react";
import * as backupService from "../services/backup.service";

export default function useBackup() {
  const [backup, setBackup] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBackup = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await backupService.getAdminBackups();
      setBackup(data);
    } catch (err) {
      setError(err?.message || "Unable to load backup details.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBackup();
  }, [loadBackup]);

  return {
    backup,
    loading,
    error,
    refresh: loadBackup,
  };
}
