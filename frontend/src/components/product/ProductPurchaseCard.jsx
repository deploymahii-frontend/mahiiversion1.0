import QuantitySelector from "./QuantitySelector";

export default function ProductPurchaseCard({
    product,
    quantity,
    increase,
    decrease,
    addToCart,
    buyNow,
}) {
    const price =
        product.discountedPrice > 0
            ? product.discountedPrice
            : product.price;

    const total = price * quantity;

    return (
        <section className="max-w-7xl mx-auto mt-10">

            <div className="bg-white rounded-3xl p-8 shadow">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-gray-500">
                            Total
                        </p>

                        <h2 className="text-4xl font-bold">

                            ₹{total}

                        </h2>

                    </div>

                    <QuantitySelector
                        quantity={quantity}
                        onIncrease={increase}
                        onDecrease={decrease}
                    />

                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-8">

                    <button
                        onClick={addToCart}
                        disabled={!product.isAvailable}
                        className={`py-4 rounded-2xl font-bold ${
                            product.isAvailable
                                ? "bg-orange-500 text-white"
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                    >
                        {product.isAvailable ? "Add To Cart" : "Out Of Stock"}
                    </button>

                    <button
                        onClick={buyNow}
                        disabled={!product.isAvailable}
                        className={`py-4 rounded-2xl font-bold ${
                            product.isAvailable
                                ? "border border-orange-500 text-orange-500"
                                : "border border-gray-300 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        {product.isAvailable ? "Buy Now" : "Out Of Stock"}
                    </button>

                </div>

            </div>

        </section>
    );
}
