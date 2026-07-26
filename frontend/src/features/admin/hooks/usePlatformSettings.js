import { useCallback, useEffect, useState } from "react";
import * as platformSettingsService from "../services/platformSettings.service";

export default function usePlatformSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await platformSettingsService.getPlatformSettings();
      setSettings(data);
    } catch (err) {
      setError(err?.message || "Unable to load platform settings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  async function saveSettings(payload) {
    try {
      setLoading(true);
      const data = await platformSettingsService.savePlatformSettings(payload);
      setSettings(data);
      return data;
    } finally {
      setLoading(false);
    }
  }

  return {
    settings,
    loading,
    error,
    saveSettings,
    refresh: loadSettings,
  };
}
