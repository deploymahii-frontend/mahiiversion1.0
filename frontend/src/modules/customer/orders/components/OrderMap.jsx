import { MapPin, Navigation } from "lucide-react";

export default function OrderMap({ location }) {
  return (
    <div className="relative h-64 w-full rounded-3xl bg-slate-100 overflow-hidden border border-slate-200 flex items-center justify-center">
      {/* Visual map placeholder mockup with CSS grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
      
      {/* Route animation graphic */}
      <div className="relative z-10 flex flex-col items-center gap-3 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm text-center">
        <div className="flex items-center gap-4 text-emerald-600">
          <Navigation size={24} className="animate-bounce" />
          <MapPin size={24} className="text-blue-600" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Delivery Route</p>
          <p className="text-sm font-semibold text-slate-700 mt-0.5">
            {location?.partnerAddress || "Delivery partner is on the way"}
          </p>
        </div>
      </div>
    </div>
  );
}
