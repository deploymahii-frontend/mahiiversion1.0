import { useEffect, useState } from "react";
import * as customerService from "../services/customer.service";

export default function useCustomers() {

    const [customers, setCustomers] = useState([]);

    const [loading, setLoading] = useState(true);

    async function loadCustomers(params = {}) {

        try {
            setLoading(true);

            const { data } =
                await customerService.getCustomers(params);

            setCustomers(data.data || data || []);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadCustomers();

    }, []);

    return {

        customers,

        loading,

        refresh: loadCustomers,

    };

}
