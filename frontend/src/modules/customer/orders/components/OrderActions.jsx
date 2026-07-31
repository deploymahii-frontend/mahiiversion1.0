import { useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, Download, HelpCircle, XCircle, MapPin } from "lucide-react";
import CancelOrderDialog from "./CancelOrderDialog";
import { CANCELLABLE_STATUSES } from "../constants/orderStatus";
import toast from "react-hot-toast";

export default function OrderActions({ order }) {
  const [showCancelModal, setShowCancelModal] = useState(false);

  if (!order) return null;

  const isCancellable = CANCELLABLE_STATUSES.includes(order.status);
  const isDelivered = order.status === "DELIVERED";

  const handleDownloadInvoice = () => {
    toast.success("Downloading invoice...");
  };

  return (
    <>
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Track Order button if order is active */}
        {!isDelivered && order.status !== "CANCELLED" && (
          <Link
            to={`/customer/orders/${order._id}/track`}
            className="py-3 px-4 rounded-2xl bg-emerald-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition"
          >
            <MapPin size={18} />
            Live Tracking
          </Link>
        )}

        {/* Reorder */}
        <button
          onClick={() => toast.success("Items added to cart")}
          className="py-3 px-4 rounded-2xl bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
        >
          <RefreshCw size={18} />
          Reorder
        </button>

        {/* Invoice */}
        <button
          onClick={handleDownloadInvoice}
          className="py-3 px-4 rounded-2xl border border-slate-200 bg-white text-slate-700 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition"
        >
          <Download size={18} />
          Invoice
        </button>

        {/* Support */}
        <Link
          to="/customer/support"
          className="py-3 px-4 rounded-2xl border border-slate-200 bg-white text-slate-700 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition"
        >
          <HelpCircle size={18} />
          Need Help
        </Link>

        {/* Cancel option */}
        {isCancellable && (
          <button
            onClick={() => setShowCancelModal(true)}
            className="py-3 px-4 rounded-2xl bg-red-50 text-red-600 font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition sm:col-span-2 lg:col-span-4"
          >
            <XCircle size={18} />
            Cancel Order
          </button>
        )}
      </section>

      <CancelOrderDialog
        orderId={order._id}
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
      />
    </>
  );
}
