import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as checkoutService from "../services/checkout.service";

export default function useCheckout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function placeOrder() {
    try {
      setLoading(true);
      setError(null);

      const order = await checkoutService.createOrder({
        deliveryAddress: address,
        paymentMethod,
      });

      navigate("/orders/success", {
        state: {
          order,
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    address,
    setAddress,
    paymentMethod,
    setPaymentMethod,
    loading,
    error,
    placeOrder,
  };
}
