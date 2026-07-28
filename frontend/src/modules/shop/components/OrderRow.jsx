import { Link } from "react-router-dom";

export default function OrderRow({

    order,

    onStatusChange,

}) {

    return (

        <tr className="border-b hover:bg-gray-50">

            <td className="p-4 font-semibold">

                {order.orderNumber}

            </td>

            <td>

                {order.customer?.fullName || order.customer?.name || "N/A"}

            </td>

            <td>

                ₹{order.totalAmount}

            </td>

            <td>

                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    {order.orderStatus}
                </span>

            </td>

            <td>

                <select
                    value={order.orderStatus}
                    onChange={(e) =>

                        onStatusChange(
                            order._id,
                            e.target.value
                        )

                    }
                    className="border rounded px-2 py-1 text-sm bg-white"
                >

                    <option value="PLACED">

                        PLACED

                    </option>

                    <option value="ACCEPTED">

                        ACCEPTED

                    </option>

                    <option value="PREPARING">

                        PREPARING

                    </option>

                    <option value="READY">

                        READY

                    </option>

                    <option value="DELIVERED">

                        DELIVERED

                    </option>

                    <option value="CANCELLED">

                        CANCELLED

                    </option>

                </select>

            </td>

            <td>

                <Link

                    to={`/shop/orders/${order._id}`}

                    className="text-blue-600 font-medium hover:underline ml-2"

                >

                    View

                </Link>

            </td>

        </tr>

    );

}
