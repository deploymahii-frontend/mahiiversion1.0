export default function InventorySummary({

    analytics = {},

}) {

    return (

        <div className="grid lg:grid-cols-4 gap-6">

            <div className="bg-blue-600 text-white p-6 rounded-xl shadow">

                <h3 className="text-sm font-medium opacity-80">Total Products</h3>

                <h1 className="text-4xl font-bold mt-2">{analytics.totalProducts ?? 0}</h1>

            </div>

            <div className="bg-green-600 text-white p-6 rounded-xl shadow">

                <h3 className="text-sm font-medium opacity-80">In Stock</h3>

                <h1 className="text-4xl font-bold mt-2">{analytics.inStock ?? 0}</h1>

            </div>

            <div className="bg-yellow-500 text-white p-6 rounded-xl shadow">

                <h3 className="text-sm font-medium opacity-80">Low Stock</h3>

                <h1 className="text-4xl font-bold mt-2">{analytics.lowStock ?? 0}</h1>

            </div>

            <div className="bg-red-600 text-white p-6 rounded-xl shadow">

                <h3 className="text-sm font-medium opacity-80">Out of Stock</h3>

                <h1 className="text-4xl font-bold mt-2">{analytics.outOfStock ?? 0}</h1>

            </div>

        </div>

    );

}
