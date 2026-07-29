import { useEffect, useState } from "react";
import * as customerService from "../services/customer.service";
import { toast } from "react-hot-toast";

export default function useCustomer(id) {

    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    async function loadCustomer() {
        if (!id) return;
        try {
            setLoading(true);
            const { data } = await customerService.getCustomer(id);
            setCustomer(data.data || data);
        } catch {
            toast.error("Failed to load customer details.");
        } finally {
            setLoading(false);
        }
    }

    async function toggleBlockStatus() {
        if (!customer) return;
        try {
            if (customer.isBlocked) {
                await customerService.unblockCustomer(id);
                toast.success("Customer unblocked.");
            } else {
                await customerService.blockCustomer(id);
                toast.success("Customer blocked.");
            }
            loadCustomer();
        } catch {
            toast.error("Action failed.");
        }
    }

    useEffect(() => {
        loadCustomer();
    }, [id]);

    return {
        customer,
        loading,
        refresh: loadCustomer,
        toggleBlockStatus,
    };
}
