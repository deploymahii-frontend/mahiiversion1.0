export default function ShopSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Banner */}
      <div className="h-48 bg-gray-200 w-full" />

      {/* Shop Info */}
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 w-40 rounded" />
        <div className="h-4 bg-gray-200 w-60 rounded" />
        <div className="flex gap-4">
          <div className="h-4 bg-gray-200 w-20 rounded" />
          <div className="h-4 bg-gray-200 w-20 rounded" />
        </div>
      </div>

      {/* Categories */}
      <div className="p-6 flex gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-8 bg-gray-200 w-20 rounded-full"
          />
        ))}
      </div>

      {/* Product Grid */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="space-y-3"
          >
            <div className="h-40 bg-gray-200 rounded-lg" />
            <div className="h-4 bg-gray-200 w-full rounded" />
            <div className="h-4 bg-gray-200 w-24 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
