export default function ShopHero({ shop }) {
  if (!shop) return null;

  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden bg-gray-200">
      <img
        src={shop.coverImage}
        alt={shop.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
