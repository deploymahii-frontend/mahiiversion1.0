export default function RestockRecommendations({

    products,

}) {

    return (

        <div className="bg-white rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-5">

                Recommended Restocking

            </h2>

            <div className="space-y-4">

                {

                    products.map(product => (

                        <div

                            key={product._id}

                            className="border rounded-lg p-4 flex justify-between"

                        >

                            <div>

                                <h3 className="font-semibold">

                                    {product.name}

                                </h3>

                                <p>

                                    Remaining Stock:
                                    {product.stock}

                                </p>

                            </div>

                            <div>

                                Recommended:

                                <strong>

                                    {product.recommended}

                                </strong>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}
