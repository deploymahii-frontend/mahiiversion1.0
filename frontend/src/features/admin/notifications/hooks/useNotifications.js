import { useEffect, useState } from "react";
import {
  getNotifications,
  createNotification as postNotification,
} from "../services/notification.service";

const DEFAULT_FILTERS = {
  search: "",
  module: "",
  action: "",
  admin: "",
  fromDate: "",
  toDate: "",
};

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(false);

  async function loadNotifications() {
    setLoading(true);

    try {
      const data = await getNotifications(filters);
      setNotifications(data);
    } finally {
      setLoading(false);
    }
  }

  async function createNotification(payload) {
    setLoading(true);

    try {
      await postNotification(payload);
      await loadNotifications();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, [filters]);

  return {
    notifications,
    loading,
    refresh: loadNotifications,
    createNotification,
    filters,
    setFilters,
  };
}
