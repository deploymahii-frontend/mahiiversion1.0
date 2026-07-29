import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createPaymentOrder, verifyPayment } from "../api/payment.api";
import { createOrder } from "../api/order.api";
import cartAPI from "../api/cart.api";

export function usePayment() {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const startPayment = async ({ amount, receipt, orderData }) => {
    if (processing) return;

    setProcessing(true);

    try {
      const createdOrder = await createOrder({
        ...orderData,
        paymentMethod: "RAZORPAY",
        paymentStatus: "PENDING",
      });

      const razorpayOrder = await createPaymentOrder({
        amount,
        receipt: createdOrder.orderNumber || receipt,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Mahii",
        description: "Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            const verify = await verifyPayment({
              orderId: createdOrder._id,
              ...response,
            });

            if (!verify.verified) {
              toast.error("Payment verification failed");
              return;
            }

            await cartAPI.clearCart();
            navigate("/orders/success");
          } catch (error) {
            console.error(error);
            toast.error("Something went wrong while placing your order");
          }
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        theme: {
          color: "#ff6b35",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error(response.error);
        toast.error("Payment failed");
        navigate("/checkout");
      });

      razorpay.open();
    } catch (error) {
      console.error(error);
      toast.error("Unable to start payment");
    } finally {
      setProcessing(false);
    }
  };

  return {
    startPayment,
    processing,
  };
}
