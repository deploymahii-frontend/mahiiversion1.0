import { Users, Gift } from "lucide-react";

export default function ReferralHero() {
  return (
    <section className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-md space-y-3">
      <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md w-fit">
        <Gift size={32} />
      </div>
      <h1 className="text-3xl font-black">Invite Friends & Earn Cash</h1>
      <p className="text-emerald-100 text-sm max-w-lg">
        Earn ₹100 Mahii Wallet cash for every friend who joins using your referral code and places their first order!
      </p>
    </section>
  );
}
