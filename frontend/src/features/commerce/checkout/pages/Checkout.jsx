import DeliveryAddressForm from "../components/DeliveryAddressForm";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import OrderSummary from "../components/OrderSummary";
import PlaceOrderButton from "../components/PlaceOrderButton";

export default function Checkout() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Checkout
      </h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <DeliveryAddressForm />
          <PaymentMethodSelector />
        </div>

        <div>
          <OrderSummary />
          <PlaceOrderButton />
        </div>
      </div>
    </div>
  );
}
