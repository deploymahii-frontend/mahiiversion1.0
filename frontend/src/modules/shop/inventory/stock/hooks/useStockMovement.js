import { useEffect, useState } from "react";
import * as stockService from "../services/stock.service";

export default function useStockMovement() {

    const [movements, setMovements] = useState([]);

    const [loading, setLoading] = useState(true);

    async function loadMovements() {

        try {

            const { data } =
                await stockService.getStockMovements();

            setMovements(data.data);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadMovements();

    }, []);

    return {

        movements,

        loading,

        refresh: loadMovements,

    };

}
