import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useOrder from "../hooks/useOrder";

import OrderHeader from "../components/OrderHeader";
import OrderTimeline from "../components/OrderTimeline";
import DeliveryInfo from "../components/DeliveryInfo";
import OrderItems from "../components/OrderItems";
import BillSummary from "../components/BillSummary";
import PaymentCard from "../components/PaymentCard";
import AddressCard from "../components/AddressCard";
import OrderActions from "../components/OrderActions";
import DeliveryPartnerCard from "../components/DeliveryPartnerCard";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { data: order, isLoading } = useOrder(id);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-40 bg-slate-200 rounded-lg" />
        <div className="h-32 bg-slate-200 rounded-3xl" />
        <div className="h-48 bg-slate-200 rounded-3xl" />
        <div className="h-40 bg-slate-200 rounded-3xl" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-4">
        <Link to="/customer/orders" className="inline-flex items-center gap-2 text-slate-600 font-semibold hover:text-blue-600">
          <ArrowLeft size={18} /> Back to Orders
        </Link>
        <div className="rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center bg-white">
          <h3 className="text-lg font-bold text-slate-700">Order Not Found</h3>
          <p className="text-slate-500 text-sm mt-1">The requested order could not be located.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/customer/orders"
        className="inline-flex items-center gap-2 text-slate-600 font-semibold hover:text-blue-600 transition"
      >
        <ArrowLeft size={18} />
        Back to Orders
      </Link>

      <OrderHeader order={order} />

      <OrderTimeline status={order.status} timeline={order.timeline} />

      <DeliveryInfo order={order} />

      {order.deliveryPartner && (
        <DeliveryPartnerCard partner={order.deliveryPartner} />
      )}

      <OrderItems items={order.items} />

      <BillSummary bill={order.bill || { subtotal: order.total, grandTotal: order.grandTotal }} />

      <PaymentCard payment={order.payment} />

      <AddressCard address={order.deliveryAddress} />

      <OrderActions order={order} />
    </div>
  );
}
