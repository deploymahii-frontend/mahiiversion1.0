import React from "react";

export default function Invoice({ order }) {

    if (!order) return null;

    return (

        <div
            id="invoice"
            className="bg-white p-8 rounded-xl w-full"
        >

            <div className="flex justify-between border-b pb-6">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">

                        Mahii

                    </h1>

                    <p className="text-sm text-gray-500">

                        Shop Invoice

                    </p>

                </div>

                <div className="text-right">

                    <h2 className="font-bold text-lg text-gray-700">

                        Invoice

                    </h2>

                    <p className="text-sm text-gray-500">

                        #{order.orderNumber}

                    </p>

                </div>

            </div>

            <div className="grid grid-cols-2 gap-10 mt-8">

                <div>

                    <h3 className="font-bold text-gray-800 mb-1">

                        Customer

                    </h3>

                    <p className="text-sm text-gray-600">{order.customer?.fullName || order.customer?.name}</p>

                    <p className="text-sm text-gray-600">{order.customer?.mobile}</p>

                    <p className="text-sm text-gray-600">{order.customer?.email}</p>

                </div>

                <div>

                    <h3 className="font-bold text-gray-800 mb-1">

                        Delivery Address

                    </h3>

                    <p className="text-sm text-gray-600">

                        {order.deliveryAddress?.addressLine}

                    </p>

                    <p className="text-sm text-gray-600">

                        {order.deliveryAddress?.city}

                    </p>

                </div>

            </div>

            <table className="w-full mt-8 border-collapse">

                <thead>

                    <tr className="border-b text-sm text-gray-600">

                        <th align="left" className="py-2">

                            Item

                        </th>

                        <th className="py-2">

                            Qty

                        </th>

                        <th className="py-2">

                            Price

                        </th>

                        <th className="py-2">

                            Total

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        order.items?.map(item =>

                            <tr key={item.product} className="border-b text-sm">

                                <td className="py-2">

                                    {item.name}

                                </td>

                                <td align="center" className="py-2">

                                    {item.quantity}

                                </td>

                                <td align="center" className="py-2">

                                    ₹{item.price}

                                </td>

                                <td align="center" className="py-2">

                                    ₹{item.total}

                                </td>

                            </tr>

                        )

                    }

                </tbody>

            </table>

            <div className="flex justify-end mt-8">

                <div className="text-right space-y-1">

                    <p className="text-sm text-gray-600">

                        Sub Total : ₹{order.subTotal || order.totalAmount}

                    </p>

                    <p className="text-sm text-gray-600">

                        Tax : ₹{order.tax || 0}

                    </p>

                    <p className="text-sm text-gray-600">

                        Delivery : ₹{order.deliveryCharge || 0}

                    </p>

                    <h1 className="text-3xl font-bold text-gray-900 pt-2">

                        ₹{order.totalAmount}

                    </h1>

                </div>

            </div>

        </div>

    );

}
