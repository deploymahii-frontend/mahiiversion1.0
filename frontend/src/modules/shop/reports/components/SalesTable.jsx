export default function SalesTable({

    orders,

}) {

    return (

        <div className="bg-white rounded-xl overflow-hidden">

            <table className="w-full">

                <thead>

                    <tr>

                        <th>Order</th>

                        <th>Customer</th>

                        <th>Payment</th>

                        <th>Status</th>

                        <th>Amount</th>

                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        orders.map(order=>

                            <tr key={order._id}>

                                <td>

                                    {order.orderNumber}

                                </td>

                                <td>

                                    {order.customer.fullName}

                                </td>

                                <td>

                                    {order.paymentMethod}

                                </td>

                                <td>

                                    {order.orderStatus}

                                </td>

                                <td>

                                    ₹{order.totalAmount}

                                </td>

                                <td>

                                    {

                                        new Date(

                                            order.createdAt

                                        ).toLocaleDateString()

                                    }

                                </td>

                            </tr>

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}
