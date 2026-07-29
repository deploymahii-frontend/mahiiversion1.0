import { useEffect, useState } from "react";
import * as orderService from "../services/order.service";

export default function useOrders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadOrders = async () => {

        try {

            const { data } =
                await orderService.getOrders();

            setOrders(data.data || data || []);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadOrders();

    }, []);

    return {

        orders,

        loading,

        refresh: loadOrders,

    };

}
