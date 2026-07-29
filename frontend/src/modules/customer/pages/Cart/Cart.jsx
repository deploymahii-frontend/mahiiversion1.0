import CustomerLayout from "@/layouts/CustomerLayout";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import CouponCard from "./components/CouponCard";

export default function Cart() {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Cart</h1>
        <CartItem />
        <CouponCard />
        <CartSummary />
      </div>
    </CustomerLayout>
  );
}
