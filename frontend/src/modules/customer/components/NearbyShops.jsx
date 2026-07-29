// src/modules/customer/components/NearbyShops.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaMapMarkerAlt,
    FaClock,
    FaCircle,
    FaArrowRight,
    FaStar,
} from "react-icons/fa";

export default function NearbyShops({

    shops = [],

}) {

    if (!shops.length) {

        return null;

    }

    return (

        <section>

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold">

                        Nearby Shops

                    </h2>

                    <p className="mt-1 text-gray-500">

                        Discover businesses close to your location

                    </p>

                </div>

                <Link

                    to="/nearby"

                    className="flex items-center gap-2 text-blue-600 hover:underline"

                >

                    See Nearby

                    <FaArrowRight />

                </Link>

            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

                {

                    shops.map(shop => (

                        <motion.div

                            key={shop._id}

                            whileHover={{

                                y: -5,

                            }}

                            className="min-w-[320px] overflow-hidden rounded-3xl border bg-white shadow-sm hover:shadow-lg"

                        >

                            <img

                                src={shop.image}

                                alt={shop.name}

                                loading="lazy"

                                className="h-44 w-full object-cover"

                            />

                            <div className="p-5">

                                <div className="flex items-start justify-between">

                                    <div>

                                        <h3 className="text-lg font-bold">

                                            {shop.name}

                                        </h3>

                                        <p className="text-sm text-gray-500">

                                            {shop.category}

                                        </p>

                                    </div>

                                    <div className="flex items-center gap-1 rounded-lg bg-green-600 px-2 py-1 text-sm font-semibold text-white">

                                        <FaStar />

                                        {shop.rating}

                                    </div>

                                </div>

                                <div className="mt-4 flex items-center justify-between text-sm">

                                    <span className="flex items-center gap-2 text-gray-600">

                                        <FaMapMarkerAlt />

                                        {shop.distance}

                                    </span>

                                    <span className="flex items-center gap-2 text-gray-600">

                                        <FaClock />

                                        {shop.deliveryTime}

                                    </span>

                                </div>

                                <div className="mt-4 flex items-center justify-between">

                                    <span

                                        className={`flex items-center gap-2 text-sm font-semibold ${
                                            shop.isOpen
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}

                                    >

                                        <FaCircle className="text-[10px]" />

                                        {

                                            shop.isOpen

                                                ? "Open Now"

                                                : "Closed"

                                        }

                                    </span>

                                    <Link

                                        to={`/shop/${shop.slug}`}

                                        className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"

                                    >

                                        Visit

                                    </Link>

                                </div>

                            </div>

                        </motion.div>

                    ))

                }

            </div>

        </section>

    );

}
