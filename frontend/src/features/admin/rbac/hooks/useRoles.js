import { useCallback, useEffect, useState } from "react";
import * as roleService from "../services/role.service";

export default function useRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRoles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await roleService.getRoles();
      setRoles(data);
    } catch (err) {
      setError(err?.message || "Unable to load roles.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  async function createRole(payload) {
    try {
      setLoading(true);
      const role = await roleService.createRole(payload);
      setRoles((prev) => [role, ...prev]);
      return role;
    } finally {
      setLoading(false);
    }
  }

  return {
    roles,
    loading,
    error,
    createRole,
    refresh: loadRoles,
  };
}
