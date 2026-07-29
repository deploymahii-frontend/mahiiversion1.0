import ShopCard from "./ShopCard";

export default function ShopGrid({ shops = [] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shops.map((shop) => (
                <ShopCard key={shop._id || shop.id || shop.slug} shop={shop} />
            ))}
        </div>
    );
}
