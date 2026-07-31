import { Crown, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function GoldMembership({ membership }) {
  const isGold = membership?.active;

  return (
    <section
      className={`rounded-3xl p-6 text-white ${
        isGold
          ? "bg-gradient-to-r from-yellow-500 to-orange-500"
          : "bg-gradient-to-r from-slate-700 to-slate-900"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Crown size={22} />
            <span className="font-bold text-lg">Mahii Gold</span>
          </div>

          {isGold ? (
            <>
              <p className="mt-3 text-white/80">
                Your membership is active — enjoy exclusive perks!
              </p>
              <p className="mt-2 text-sm font-medium">
                Expires: {membership?.expiresAt ?? "—"}
              </p>
            </>
          ) : (
            <>
              <p className="mt-3 text-white/80">
                Get free delivery, priority support & exclusive deals.
              </p>
              <div className="mt-4 flex flex-col gap-1 text-sm text-white/90">
                <span className="flex items-center gap-2"><Zap size={14} /> Free delivery on every order</span>
                <span className="flex items-center gap-2"><Zap size={14} /> Early access to flash sales</span>
                <span className="flex items-center gap-2"><Zap size={14} /> Priority customer support</span>
              </div>
            </>
          )}
        </div>

        {!isGold && (
          <Link
            to="/customer/membership"
            className="rounded-xl bg-white text-yellow-600 px-5 py-3 font-semibold flex items-center gap-2 hover:bg-yellow-50 transition"
          >
            Join
            <ArrowRight size={18} />
          </Link>
        )}
      </div>
    </section>
  );
}
