import { useEffect, useState } from "react";
import { getCategories } from "../services/adminCategory.service";

export default function useAdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadCategories() {
    setLoading(true);

    try {
      const data = await getCategories();
      setCategories(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    refresh: loadCategories,
  };
}
