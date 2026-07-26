export default function TopProducts({

    products=[]

}){

    return(

        <section className="mt-8 rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-xl font-bold">

                Top Selling Products

            </h2>

            {

                products.map(product=>(

                    <div

                        key={product._id}

                        className="mb-4 flex justify-between"

                    >

                        <span>

                            {product.name}

                        </span>

                        <span>

                            {product.sales}

                        </span>

                    </div>

                ))

            }

        </section>

    )

}
