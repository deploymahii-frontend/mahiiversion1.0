export default function MapToggle() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:border-yellow-400">
        Grid View
      </button>
      <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:border-yellow-400">
        Map View
      </button>
    </div>
  );
}
