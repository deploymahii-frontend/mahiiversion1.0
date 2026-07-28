import { useEffect, useState } from "react";
import * as inventoryService from "../services/inventory.service";

export default function useInventory() {

    const [inventory, setInventory] = useState(null);

    const [loading, setLoading] = useState(true);

    async function loadInventory() {

        try {

            const { data } =
                await inventoryService.getInventory();

            setInventory(data.data);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadInventory();

    }, []);

    return {

        inventory,

        loading,

        refresh: loadInventory,

    };

}
