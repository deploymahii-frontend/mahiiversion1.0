import { FaStar } from "react-icons/fa";

export default function ProductHero({ product }) {
  const image =
    product.images?.[0] ||
    "/images/product-placeholder.jpg";

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 p-8">

        <img
          src={image}
          alt={product.name}
          className="rounded-3xl shadow-xl w-full h-[450px] object-cover"
        />

        <div className="flex flex-col justify-center">

          <div className="flex gap-3 mb-4">

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              {product.foodType}
            </span>

            <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
              {product.category}
            </span>

          </div>

          <h1 className="text-5xl font-bold">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mt-5">

            <FaStar className="text-yellow-500" />

            <span className="font-semibold">
              {product.rating}
            </span>

            <span className="text-gray-500">
              ({product.totalReviews} Reviews)
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}
