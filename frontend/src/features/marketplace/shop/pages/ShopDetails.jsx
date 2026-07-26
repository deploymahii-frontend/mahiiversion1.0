import { useParams } from "react-router-dom";
import useShop from "../hooks/useShop";
import ProductGrid from "../components/ProductGrid";
import ShopSkeleton from "../components/ShopSkeleton";
import ErrorState from "../../../../shared/ErrorState";
import EmptyState from "../../../../components/explore/EmptyState";

export default function ShopDetails() {
  const { slug } = useParams();

  const {
    shop,
    products,
    loading,
    error,
    refresh,
  } = useShop(slug);

  if (loading) {
    return <ShopSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load shop"
        message="Please try again in a moment."
        onRetry={refresh}
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="text-3xl font-bold">
        {shop?.name}
      </h1>

      <p className="mt-2 text-gray-500">
        {shop?.description}
      </p>

      <hr className="my-6" />

      <h2 className="mb-4 text-xl font-semibold">
        Products
      </h2>

      {!products?.length ? (
        <EmptyState
          title="No products available"
          message="This shop has no products right now."
        />
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
