export default function StockMovementTable({

    movements,

}) {

    return (

        <table className="w-full bg-white rounded-xl">

            <thead>

                <tr>

                    <th>Product</th>

                    <th>Type</th>

                    <th>Quantity</th>

                    <th>Previous</th>

                    <th>Current</th>

                    <th>Date</th>

                </tr>

            </thead>

            <tbody>

                {

                    movements.map(item => (

                        <tr key={item._id}>

                            <td>{item.product}</td>

                            <td>{item.type}</td>

                            <td>{item.quantity}</td>

                            <td>{item.previousStock}</td>

                            <td>{item.currentStock}</td>

                            <td>

                                {

                                    new Date(

                                        item.createdAt

                                    ).toLocaleDateString()

                                }

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}
