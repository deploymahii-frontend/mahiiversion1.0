import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import OfferForm from "../components/OfferForm";
import * as offerService from "../services/offer.service";

export default function AddOfferPage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    async function createOffer(values) {

        try {

            setLoading(true);

            await offerService.createOffer(values);

            toast.success("Offer created successfully.");

            navigate("/shop/offers");

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Unable to create offer."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="p-8">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Create Offer

                </h1>

                <p className="text-gray-500">

                    Create discount offers and coupons.

                </p>

            </div>

            <OfferForm

                loading={loading}

                onSubmit={createOffer}

            />

        </div>

    );

}
