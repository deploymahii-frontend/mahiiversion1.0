import { Link } from "react-router-dom";

export default function OfferCard({ offer }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold">

                {offer.title}

            </h2>

            <p className="mt-2">

                {offer.description}

            </p>

            <div className="mt-4">

                <span className="text-green-600 font-bold">

                    {offer.discount}

                </span>

            </div>

            <p className="mt-2">

                Coupon:

                <strong>

                    {offer.code}

                </strong>

            </p>

            <Link

                className="mt-5 inline-block text-blue-600"

                to={`/shop/offers/${offer._id}`}

            >

                Edit

            </Link>

        </div>

    );

}
