import useOrders from "../hooks/useOrders";
import * as orderService from "../services/order.service";
import OrderRow from "../components/OrderRow";

export default function OrdersPage() {

    const {

        orders,

        loading,

        refresh,

    } = useOrders();

    async function changeStatus(id, status) {

        await orderService.updateStatus(
            id,
            status
        );

        refresh();

    }

    if (loading)

        return <div className="p-8">Loading Orders...</div>;

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">

                Orders

            </h1>

            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full text-left border-collapse">

                    <thead className="bg-gray-50 border-b">

                        <tr>

                            <th className="p-4 font-semibold text-gray-700">

                                Order #

                            </th>

                            <th className="p-4 font-semibold text-gray-700">

                                Customer

                            </th>

                            <th className="p-4 font-semibold text-gray-700">

                                Amount

                            </th>

                            <th className="p-4 font-semibold text-gray-700">

                                Status

                            </th>

                            <th className="p-4 font-semibold text-gray-700">

                                Change Status

                            </th>

                            <th className="p-4 font-semibold text-gray-700">

                                Action

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            orders.map(order =>

                                <OrderRow

                                    key={order._id}

                                    order={order}

                                    onStatusChange={changeStatus}

                                />

                            )

                        }

                    </tbody>

                </table>
            </div>

        </div>

    );

}
