import { useEffect, useState } from "react";
import * as service from "../services/shopApproval.service";

export default function usePendingShops() {

    const [shops, setShops] = useState([]);

    const [loading, setLoading] = useState(true);

    async function load() {

        try {

            const { data } =
                await service.getPendingShops();

            setShops(data.data);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        load();

    }, []);

    return {

        shops,

        loading,

        refresh: load,

    };

}
