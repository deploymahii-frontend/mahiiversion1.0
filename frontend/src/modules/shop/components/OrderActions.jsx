import { toast } from "react-hot-toast";
import * as orderService from "../services/order.service";

export default function OrderActions({
    order,
    refresh,
}) {

    async function changeStatus(status) {

        try {

            await orderService.updateStatus(
                order._id,
                status
            );

            toast.success("Order updated");

            refresh();

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to update order."
            );

        }

    }

    return (

        <div className="flex flex-wrap gap-3">

            {order.orderStatus === "PLACED" && (

                <>
                    <button
                        onClick={() =>
                            changeStatus("ACCEPTED")
                        }
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"
                    >
                        Accept
                    </button>

                    <button
                        onClick={() =>
                            changeStatus("CANCELLED")
                        }
                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold"
                    >
                        Reject
                    </button>
                </>

            )}

            {order.orderStatus === "ACCEPTED" && (

                <button
                    onClick={() =>
                        changeStatus("PREPARING")
                    }
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                >
                    Start Preparing
                </button>

            )}

            {order.orderStatus === "PREPARING" && (

                <button
                    onClick={() =>
                        changeStatus("READY")
                    }
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 font-semibold"
                >
                    Ready
                </button>

            )}

            {order.orderStatus === "READY" && (

                <button
                    onClick={() =>
                        changeStatus("DELIVERED")
                    }
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold"
                >
                    Complete Order
                </button>

            )}

        </div>

    );

}
