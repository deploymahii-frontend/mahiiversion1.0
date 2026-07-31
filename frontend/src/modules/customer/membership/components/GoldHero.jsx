import { Crown, Sparkles } from "lucide-react";

export default function GoldHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-8 sm:p-12 shadow-xl">
      <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-200 mb-4 border border-white/10">
          <Sparkles size={14} />
          MAHII GOLD VIP CLUB
        </div>

        <h1 className="text-4xl sm:text-5xl font-black leading-tight">
          Unlock Unlimited Savings & VIP Perks
        </h1>
        <p className="mt-3 text-amber-100 text-base">
          Enjoy Free Delivery, Extra 10% OFF on all mess subscriptions, priority customer support, and exclusive flash deals.
        </p>
      </div>

      <div className="absolute right-8 bottom-8 hidden md:block text-amber-200/20 pointer-events-none">
        <Crown size={180} />
      </div>
    </section>
  );
}
