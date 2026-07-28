import { useEffect, useState } from "react";
import * as service from "../services/offerAnalytics.service";

export default function useOfferAnalytics() {

    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);

    async function loadAnalytics() {

        try {

            const { data } =
                await service.getAnalytics();

            setAnalytics(data.data);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadAnalytics();

    }, []);

    return {

        analytics,

        loading,

        refresh: loadAnalytics,

    };

}
