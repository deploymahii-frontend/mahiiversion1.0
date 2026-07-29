import { Link } from "react-router-dom";

import OfferCard from "../components/OfferCard";

import useOffers from "../hooks/useOffers";

export default function OffersPage() {

    const {

        offers,

        loading,

    } = useOffers();

    if (loading)
        return <>Loading...</>;

    return (

        <div className="p-8">

            <div className="flex justify-between mb-8">

                <h1 className="text-3xl font-bold">

                    Offers

                </h1>

                <Link

                    to="/shop/offers/new"

                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"

                >

                    Create Offer

                </Link>

            </div>

            <div className="grid lg:grid-cols-4 gap-6">

                {

                    offers.map(offer => (

                        <OfferCard

                            key={offer._id}

                            offer={offer}

                        />

                    ))

                }

            </div>

        </div>

    );

}
