import { useEffect, useState } from "react";
import * as offerService from "../services/offer.service";

export default function useOffers() {

    const [offers, setOffers] = useState([]);

    const [loading, setLoading] = useState(true);

    async function loadOffers() {

        try {

            const { data } =
                await offerService.getOffers();

            setOffers(data.data);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadOffers();

    }, []);

    return {

        offers,

        loading,

        refresh: loadOffers,

    };

}
