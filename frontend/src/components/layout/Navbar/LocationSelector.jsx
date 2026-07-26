import { MapPin } from "lucide-react";

export default function LocationSelector() {
  return (
    <button className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3">
      <MapPin size={18} />
      <span>Kolhapur</span>
    </button>
  );
}
