import { useState, useEffect } from "react";
import useOrder from "../hooks/useOrder";
import OrderHeader from "../components/orders/OrderHeader";
import OrderTimeline from "../components/orders/OrderTimeline";
import OrderItems from "../components/orders/OrderItems";
import PaymentCard from "../components/orders/PaymentCard";
import DeliveryCard from "../components/orders/DeliveryCard";
import ReviewModal from "../components/shop/ReviewModal";
import { checkOrderEligibility } from "../services/review.service";
import { FiStar, FiCheckCircle } from "react-icons/fi";

export default function OrderDetails() {
  const { loading, order } = useOrder();
  const [eligibility, setEligibility] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    if (order?._id && order?.orderStatus === "DELIVERED") {
      checkOrderEligibility(order._id)
        .then((res) => {
          if (res?.data?.data) {
            setEligibility(res.data.data);
          }
        })
        .catch((err) => console.error("Error checking review eligibility", err));
    }
  }, [order]);

  if (loading) return <div className="p-10 text-center">Loading order...</div>;

  if (!order) return <div className="p-10 text-center">Order not found</div>;

  const shopId = order.shop?._id || order.shop?.id || order.shop;

  return (
    <div className="max-w-6xl mx-auto py-10 px-5 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <div>
          <OrderHeader order={order} />
        </div>

        {/* Review Action Banner */}
        {order.orderStatus === "DELIVERED" && (
          <div className="self-start sm:self-auto">
            {eligibility?.alreadyReviewed ? (
              <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-4 py-2.5 rounded-2xl text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                <FiCheckCircle size={18} />
                <span>Reviewed</span>
              </div>
            ) : eligibility?.eligible ? (
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm tracking-wide px-5 py-3 rounded-2xl shadow-md transition"
              >
                <FiStar size={18} className="fill-current" />
                <span>Write Review</span>
              </button>
            ) : null}
          </div>
        )}
      </div>

      <OrderTimeline status={order.orderStatus} />

      <OrderItems items={order.items} />

      <DeliveryCard address={order.deliveryAddress} />

      <PaymentCard order={order} />

      {/* Review Modal */}
      {order.orderStatus === "DELIVERED" && shopId && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          shopId={shopId}
          orderId={order._id}
          orderNumber={order.orderNumber}
          shopName={order.shop?.name}
          onReviewSubmitted={() => {
            setEligibility({ alreadyReviewed: true, eligible: false });
          }}
        />
      )}
    </div>
  );
}
