import BusinessCard from "./cards/BusinessCard";
import ProductCard from "./cards/ProductCard";
import ServiceCard from "./cards/ServiceCard";

export default function SearchResults({ loading, results }) {
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 p-6 md:grid-cols-3">
      {results.map((item) => {
        switch (item.type) {
          case "business":
            return <BusinessCard key={item.id || item._id} business={item} />;
          case "product":
            return <ProductCard key={item.id || item._id} product={item} />;
          default:
            return <ServiceCard key={item.id || item._id} service={item} />;
        }
      })}
    </div>
  );
}
