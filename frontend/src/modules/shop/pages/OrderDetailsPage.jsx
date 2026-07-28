import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as orderService from "../services/order.service";
import OrderActions from "../components/OrderActions";
import Invoice from "../components/Invoice";
import downloadInvoice from "../utils/downloadInvoice";

export default function OrderDetailsPage() {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [order, setOrder] = useState(null);

    const loadOrder = async () => {

        setLoading(true);

        try {

            const { data } =
                await orderService.getOrder(id);

            setOrder(data.data || data);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadOrder();

    }, [id]);

    if (loading)
        return <div className="p-8">Loading Order...</div>;

    if (!order)
        return <div className="p-8">Order not found</div>;

    return (

        <div className="p-8 max-w-5xl mx-auto space-y-8">

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">

                    Order #{order.orderNumber}

                </h1>

                <button

                    onClick={downloadInvoice}

                    className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition"

                >

                    Download Invoice

                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                <div className="bg-white rounded-xl p-6 shadow">

                    <h2 className="font-bold text-xl mb-4 text-gray-800">
                        Customer
                    </h2>

                    <p className="text-gray-700 font-medium">{order.customer?.fullName || order.customer?.name}</p>

                    <p className="text-gray-500">{order.customer?.mobile}</p>

                    <p className="text-gray-500">{order.customer?.email}</p>

                </div>

                <div className="bg-white rounded-xl p-6 shadow">

                    <h2 className="font-bold text-xl mb-4 text-gray-800">

                        Delivery Address

                    </h2>

                    <p className="text-gray-700">

                        {order.deliveryAddress?.addressLine}

                    </p>

                    <p className="text-gray-500">

                        {order.deliveryAddress?.area}

                    </p>

                    <p className="text-gray-500">

                        {order.deliveryAddress?.city}, {order.deliveryAddress?.state} - {order.deliveryAddress?.pincode}

                    </p>

                </div>

            </div>

            <div className="bg-white rounded-xl p-6 shadow">

                <h2 className="text-xl font-bold mb-4 text-gray-800">

                    Products

                </h2>

                {

                    order.items?.map(item => (

                        <div
                            key={item.product}
                            className="flex justify-between py-3 border-b last:border-0"
                        >

                            <div>

                                <p className="font-semibold text-gray-800">

                                    {item.name}

                                </p>

                                <p className="text-sm text-gray-500">

                                    Qty : {item.quantity}

                                </p>

                            </div>

                            <p className="font-bold text-gray-800">

                                ₹{item.total}

                            </p>

                        </div>

                    ))

                }

            </div>

            <div className="bg-white rounded-xl p-6 shadow flex items-center justify-between">

                <div>
                    <h2 className="font-bold text-xl mb-2 text-gray-800">

                        Payment Information

                    </h2>

                    <p className="text-sm text-gray-600">

                        Method: <span className="font-medium text-gray-800">{order.paymentMethod}</span>

                    </p>

                    <p className="text-sm text-gray-600">

                        Status: <span className="font-medium text-gray-800">{order.paymentStatus}</span>

                    </p>
                </div>

                <h1 className="text-3xl font-bold text-gray-900">

                    ₹{order.totalAmount}

                </h1>

            </div>

            <div className="bg-white rounded-xl p-6 shadow">
                <h2 className="font-bold text-lg mb-4 text-gray-800">Order Actions</h2>
                <OrderActions

                    order={order}

                    refresh={loadOrder}

                />
            </div>

            <div className="hidden">

                <Invoice

                    order={order}

                />

            </div>

        </div>

    );

}
