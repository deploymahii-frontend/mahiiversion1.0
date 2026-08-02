import useCoupons from "../hooks/useCoupons";
import CouponCard from "../components/CouponCard";
import PromoCodeInput from "../components/PromoCodeInput";

export default function CouponsPage() {
  const { data = [], isLoading } = useCoupons();

  const coupons = data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Coupons & Offers</h1>
        <p className="text-slate-500 mt-1">Apply active promo codes to save big on your next order</p>
      </div>

      <PromoCodeInput />

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-3xl bg-slate-200" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {coupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>
      )}
    </div>
  );
}
