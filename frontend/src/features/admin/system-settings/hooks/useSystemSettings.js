import { useCallback, useEffect, useState } from "react";
import * as systemSettingsService from "../services/systemSettings.service";

export default function useSystemSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await systemSettingsService.getSystemSettings();
      setSettings(data);
    } catch (err) {
      setError(err?.message || "Unable to load system settings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return {
    settings,
    loading,
    error,
    refresh: loadSettings,
  };
}
