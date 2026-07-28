export default function InventorySummaryCards({

    inventory,

}) {

    return (

        <div className="grid lg:grid-cols-4 gap-6">

            <div className="bg-blue-600 text-white rounded-xl p-6">

                <h3>Total Products</h3>

                <h1 className="text-3xl font-bold">

                    {inventory.totalProducts}

                </h1>

            </div>

            <div className="bg-yellow-500 text-white rounded-xl p-6">

                <h3>Low Stock</h3>

                <h1 className="text-3xl font-bold">

                    {inventory.lowStock}

                </h1>

            </div>

            <div className="bg-red-600 text-white rounded-xl p-6">

                <h3>Out of Stock</h3>

                <h1 className="text-3xl font-bold">

                    {inventory.outOfStock}

                </h1>

            </div>

            <div className="bg-green-600 text-white rounded-xl p-6">

                <h3>Inventory Value</h3>

                <h1 className="text-3xl font-bold">

                    ₹{inventory.stockValue}

                </h1>

            </div>

        </div>

    );

}
