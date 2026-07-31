import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useTrackOrder from "../hooks/useTrackOrder";

import LiveStatusCard from "../components/LiveStatusCard";
import ETAProgress from "../components/ETAProgress";
import OrderTimeline from "../components/OrderTimeline";
import DeliveryPartnerCard from "../components/DeliveryPartnerCard";
import DeliveryAddressCard from "../components/DeliveryAddressCard";
import OrderMap from "../components/OrderMap";
import TrackActions from "../components/TrackActions";

export default function TrackOrderPage() {
  const { id } = useParams();
  const { data, isLoading } = useTrackOrder(id);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-64 rounded-3xl bg-slate-200" />
        <div className="h-32 rounded-3xl bg-slate-200" />
        <div className="h-24 rounded-3xl bg-slate-200" />
      </div>
    );
  }

  const order = data?.order || { _id: id, status: "OUT_FOR_DELIVERY", eta: "15 min" };
  const partner = data?.partner;
  const address = data?.address;
  const location = data?.location;

  return (
    <div className="space-y-6">
      <Link
        to={`/customer/orders/${id}`}
        className="inline-flex items-center gap-2 text-slate-600 font-semibold hover:text-blue-600 transition"
      >
        <ArrowLeft size={18} />
        Back to Order Details
      </Link>

      <OrderMap location={location} />

      <LiveStatusCard order={order} />

      <ETAProgress etaPercentage={data?.etaPercentage || 65} />

      <OrderTimeline status={order.status} timeline={data?.timeline} />

      {partner && <DeliveryPartnerCard partner={partner} />}

      {address && <DeliveryAddressCard address={address} />}

      <TrackActions order={order} />
    </div>
  );
}
