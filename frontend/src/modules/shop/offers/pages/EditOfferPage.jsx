import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-hot-toast";

import OfferForm from "../components/OfferForm";

import * as offerService from "../services/offer.service";

export default function EditOfferPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [offer, setOffer] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    async function loadOffer() {

        try {

            const { data } =
                await offerService.getOffer(id);

            setOffer(data.data);

        } catch {

            toast.error("Offer not found.");

            navigate("/shop/offers");

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadOffer();

    }, []);

    async function updateOffer(values) {

        try {

            setSaving(true);

            await offerService.updateOffer(id, values);

            toast.success("Offer updated.");

            navigate("/shop/offers");

        } catch {

            toast.error("Unable to update offer.");

        } finally {

            setSaving(false);

        }

    }

    if (loading)
        return <>Loading...</>;

    return (

        <div className="p-8">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Edit Offer

                </h1>

            </div>

            <OfferForm

                initialValues={offer}

                loading={saving}

                onSubmit={updateOffer}

            />

        </div>

    );

}
