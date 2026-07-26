import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as orderService from "../services/orderService";

export default function useCheckout() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function placeOrder(data) {
    try {
      setLoading(true);

      const order = await orderService.createOrder(data);

      navigate("/orders/success", {
        state: {
          order,
        },
      });
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    placeOrder,
  };
}
