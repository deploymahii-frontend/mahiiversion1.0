// src/modules/customer/components/FeaturedShops.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaStar,
    FaHeart,
    FaRegHeart,
    FaClock,
    FaMapMarkerAlt,
    FaLeaf,
} from "react-icons/fa";
import { useState } from "react";

export default function FeaturedShops({

    shops = [],

}) {

    const [

        favourites,

        setFavourites,

    ] = useState({});

    function toggleFavourite(id) {

        setFavourites(previous => ({

            ...previous,

            [id]: !previous[id],

        }));

    }

    return (

        <section>

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold">

                    Featured Shops

                </h2>

                <Link

                    to="/explore"

                    className="text-blue-600 hover:underline"

                >

                    View All

                </Link>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {

                    shops.map(shop => (

                        <motion.div

                            key={shop._id}

                            whileHover={{

                                y: -6,

                            }}

                            transition={{

                                duration: 0.2,

                            }}

                            className="overflow-hidden rounded-3xl border bg-white shadow-sm hover:shadow-xl"

                        >

                            <div className="relative">

                                <img

                                    src={shop.image}

                                    alt={shop.name}

                                    loading="lazy"

                                    className="h-52 w-full object-cover"

                                />

                                <button

                                    onClick={() =>

                                        toggleFavourite(shop._id)

                                    }

                                    className="absolute right-4 top-4 rounded-full bg-white p-3 shadow"

                                >

                                    {

                                        favourites[shop._id]

                                            ? (

                                                <FaHeart className="text-red-500" />

                                            )

                                            : (

                                                <FaRegHeart />

                                            )

                                    }

                                </button>

                                {

                                    shop.pureVeg && (

                                        <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">

                                            <FaLeaf />

                                            Pure Veg

                                        </span>

                                    )

                                }

                            </div>

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

                                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">

                                    <span className="flex items-center gap-2">

                                        <FaClock />

                                        {shop.deliveryTime}

                                    </span>

                                    <span className="flex items-center gap-2">

                                        <FaMapMarkerAlt />

                                        {shop.distance}

                                    </span>

                                </div>

                                <div className="mt-4 flex items-center justify-between">

                                    <div>

                                        <p className="text-sm text-gray-500">

                                            Starting From

                                        </p>

                                        <h4 className="text-xl font-bold text-blue-600">

                                            ₹{shop.startingPrice}

                                        </h4>

                                    </div>

                                    <Link

                                        to={`/shop/${shop.slug}`}

                                        className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"

                                    >

                                        View

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
