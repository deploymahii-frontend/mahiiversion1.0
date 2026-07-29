import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as orderService from "../services/orderService";

export default function useOrder() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await orderService.getOrder(id);
        setOrder(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return {
    loading,
    order,
  };
}
