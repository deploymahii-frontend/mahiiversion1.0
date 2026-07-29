import { Link } from "react-router-dom";

export default function ProductCard({

    product,

}) {

    return (

        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden flex flex-col justify-between">

            <img

                src={product.images?.[0] || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80"}

                alt={product.name}

                className="w-full h-48 object-cover"

            />

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">

                <div>
                    <h2 className="font-bold text-gray-900 text-lg line-clamp-1">

                        {product.name}

                    </h2>

                    <p className="text-gray-600 font-semibold text-base mt-1">

                        ₹{product.price}

                    </p>

                    <p className="text-xs text-gray-500 mt-1">

                        Stock : {product.stock}

                    </p>
                </div>

                <div className="flex gap-3 pt-2 border-t">

                    <Link

                        to={`/shop/products/${product._id}`}

                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center w-full transition"

                    >

                        Edit

                    </Link>

                </div>

            </div>

        </div>

    );

}
