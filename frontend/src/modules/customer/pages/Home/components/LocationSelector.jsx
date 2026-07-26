import { MapPin } from "lucide-react";

export default function LocationSelector() {
  return (
    <button className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur">
      <MapPin size={18} />
      <span>Kolhapur</span>
    </button>
  );
}
