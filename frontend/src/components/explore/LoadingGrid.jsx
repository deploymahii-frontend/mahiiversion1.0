export default function LoadingGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="h-80 rounded-3xl bg-gray-200 animate-pulse" />
      ))}
    </div>
  );
}
