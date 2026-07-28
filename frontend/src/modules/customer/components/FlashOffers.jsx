// src/modules/customer/components/FlashOffers.jsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaBolt,
    FaClock,
    FaTag,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FlashOffers({

    offers = [],

}) {

    const [timeLeft, setTimeLeft] =
        useState({});

    useEffect(() => {

        const timer = setInterval(() => {

            const updated = {};

            offers.forEach(offer => {

                const expiry = new Date(

                    offer.expiresAt

                ).getTime();

                const now = Date.now();

                const diff = Math.max(

                    expiry - now,

                    0

                );

                const hours = Math.floor(

                    diff / 3600000

                );

                const minutes = Math.floor(

                    (diff % 3600000) / 60000

                );

                const seconds = Math.floor(

                    (diff % 60000) / 1000

                );

                updated[offer._id] = {

                    hours,

                    minutes,

                    seconds,

                };

            });

            setTimeLeft(updated);

        }, 1000);

        return () => clearInterval(timer);

    }, [offers]);

    if (!offers.length) {

        return null;

    }

    return (

        <section>

            <div className="mb-6 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <FaBolt className="text-yellow-500 text-2xl" />

                    <h2 className="text-2xl font-bold">

                        Flash Offers

                    </h2>

                </div>

                <Link

                    to="/offers"

                    className="text-blue-600 hover:underline"

                >

                    View All

                </Link>

            </div>

            <div className="flex gap-6 overflow-x-auto pb-3 scrollbar-hide">

                {

                    offers.map(offer => (

                        <motion.div

                            key={offer._id}

                            whileHover={{

                                y: -5,

                            }}

                            className="min-w-[320px] rounded-3xl bg-white shadow-md border overflow-hidden"

                        >

                            <img

                                src={offer.image}

                                alt={offer.title}

                                className="h-44 w-full object-cover"

                                loading="lazy"

                            />

                            <div className="p-5">

                                <div className="flex items-center justify-between">

                                    <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">

                                        {offer.discount}% OFF

                                    </span>

                                    <span className="flex items-center gap-2 text-sm text-gray-500">

                                        <FaTag />

                                        {offer.code}

                                    </span>

                                </div>

                                <h3 className="mt-4 text-xl font-bold">

                                    {offer.title}

                                </h3>

                                <p className="mt-2 text-gray-600">

                                    {offer.description}

                                </p>

                                <div className="mt-5 flex items-center justify-between">

                                    <div className="flex items-center gap-2 text-sm text-red-600 font-semibold">

                                        <FaClock />

                                        {

                                            timeLeft[offer._id]

                                                ? `${timeLeft[offer._id].hours}h ${timeLeft[offer._id].minutes}m ${timeLeft[offer._id].seconds}s`

                                                : "--"

                                        }

                                    </div>

                                    <Link

                                        to={`/offer/${offer._id}`}

                                        className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"

                                    >

                                        Claim

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
