import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as orderService from "../services/orderService";

export default function useCheckout() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  async function placeOrder(data) {
    try {
      setLoading(true);

      const order = await orderService.createOrder(data);

      if (data.paymentMethod === "RAZORPAY" && order.razorpayOrderId) {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          alert("Razorpay SDK failed to load. Are you online?");
          setLoading(false);
          return;
        }

        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
        if (!razorpayKey) {
          alert("Payment provider configuration is missing. Please contact support.");
          setLoading(false);
          return;
        }

        const options = {
          key: razorpayKey,
          amount: order.totalAmount * 100,
          currency: "INR",
          name: "Mahii",
          description: "Order Payment",
          order_id: order.razorpayOrderId,
          handler: async function (response) {
            try {
              await orderService.verifyPayment(order._id || order.id, {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                amount: order.totalAmount * 100
              });
              
              navigate("/orders/success", { state: { order } });
            } catch (err) {
              alert("Payment verification failed");
              navigate("/orders/success", { state: { order, paymentFailed: true } });
            }
          },
          prefill: {
            name: data.deliveryAddress.fullName || "Customer",
            contact: data.deliveryAddress.mobile || "",
          },
          theme: {
            color: "#f97316", // orange-500
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
          alert("Payment Failed: " + response.error.description);
          setLoading(false);
        });
        rzp.open();
      } else {
        // Cash or UPI directly navigate to success
        navigate("/orders/success", {
          state: {
            order,
          },
        });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    placeOrder,
  };
}
