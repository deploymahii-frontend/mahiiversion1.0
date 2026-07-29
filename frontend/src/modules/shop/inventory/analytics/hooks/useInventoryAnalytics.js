import { useEffect, useState } from "react";
import * as service from "../services/inventoryAnalytics.service";

export default function useInventoryAnalytics() {

    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);

    async function load() {

        try {

            const { data } =
                await service.getAnalytics();

            setAnalytics(data.data || data);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        load();

    }, []);

    return {

        analytics,

        loading,

        refresh: load,

    };

}
