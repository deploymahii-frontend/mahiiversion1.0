import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {

    const {

        products,

        loading,

    } = useProducts();

    if (loading)

        return <div className="p-8">Loading Products...</div>;

    return (

        <div className="p-8">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">

                    Products

                </h1>

                <Link

                    to="/shop/products/new"

                    className="bg-blue-600 hover:bg-blue-700 font-semibold text-white px-6 py-3 rounded-lg transition"

                >

                    Add Product

                </Link>

            </div>

            {products.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center text-gray-500">
                    No products added yet.
                </div>
            ) : (
                <div className="grid lg:grid-cols-4 gap-6">

                    {

                        products.map(product => (

                            <ProductCard

                                key={product._id}

                                product={product}

                            />

                        ))

                    }

                </div>
            )}

        </div>

    );

}
