import { Grid2X2, Map } from "lucide-react";

export default function MapViewToggle({
  view,
  setView,
}) {
  return (
    <div className="fixed bottom-24 right-6 z-50">
      <button
        onClick={() =>
          setView(view === "grid" ? "map" : "grid")
        }
        className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-white shadow-xl"
      >
        {view === "grid" ? <Map size={20} /> : <Grid2X2 size={20} />}
        {view === "grid" ? "Map" : "Grid"}
      </button>
    </div>
  );
}
