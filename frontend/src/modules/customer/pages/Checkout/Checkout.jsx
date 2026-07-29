import CustomerLayout from "@/layouts/CustomerLayout";
import AddressSelector from "./components/AddressSelector";
import DeliveryOption from "./components/DeliveryOption";
import PaymentSelector from "./components/PaymentSelector";
import OrderSummary from "./components/OrderSummary";

export default function Checkout() {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <AddressSelector />
        <DeliveryOption />
        <PaymentSelector />
        <OrderSummary />
      </div>
    </CustomerLayout>
  );
}
