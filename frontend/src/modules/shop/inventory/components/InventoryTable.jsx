export default function InventoryTable({

    products,

}) {

    return (

        <table className="w-full bg-white rounded-xl">

            <thead>

                <tr>

                    <th>Product</th>

                    <th>Category</th>

                    <th>Price</th>

                    <th>Stock</th>

                    <th>Status</th>

                </tr>

            </thead>

            <tbody>

                {

                    products.map(product => (

                        <tr key={product._id}>

                            <td>{product.name}</td>

                            <td>{product.category}</td>

                            <td>₹{product.price}</td>

                            <td>{product.stock}</td>

                            <td>

                                {

                                    product.stock === 0

                                    ? "Out"

                                    : product.stock <= 10

                                    ? "Low"

                                    : "Available"

                                }

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}
