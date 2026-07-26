import useOrder from "../hooks/useOrder";
import OrderHeader from "../components/orders/OrderHeader";
import OrderTimeline from "../components/orders/OrderTimeline";
import OrderItems from "../components/orders/OrderItems";
import PaymentCard from "../components/orders/PaymentCard";
import DeliveryCard from "../components/orders/DeliveryCard";

export default function OrderDetails() {
  const { loading, order } = useOrder();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-5 space-y-8">
      <OrderHeader order={order} />

      <OrderTimeline status={order.orderStatus} />

      <OrderItems items={order.items} />

      <DeliveryCard address={order.deliveryAddress} />

      <PaymentCard order={order} />
    </div>
  );
}
