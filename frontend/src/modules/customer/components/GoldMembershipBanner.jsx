// src/modules/customer/components/GoldMembershipBanner.jsx

import { motion } from "framer-motion";
import {
    FaCrown,
    FaCheckCircle,
    FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function GoldMembershipBanner() {

    const benefits = [

        "Exclusive student discounts",

        "Priority customer support",

        "Early access to flash sales",

        "Extra cashback on selected shops",

        "Free delivery on eligible orders",

    ];

    return (

        <motion.section

            initial={{

                opacity: 0,

                y: 40,

            }}

            whileInView={{

                opacity: 1,

                y: 0,

            }}

            viewport={{

                once: true,

            }}

            transition={{

                duration: 0.6,

            }}

            className="overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 shadow-xl"

        >

            <div className="grid gap-8 p-8 lg:grid-cols-2 lg:p-12">

                {/* Left */}

                <div className="text-white">

                    <div className="mb-4 flex items-center gap-3">

                        <motion.div

                            animate={{

                                rotate: [

                                    0,

                                    8,

                                    -8,

                                    0,

                                ],

                            }}

                            transition={{

                                repeat: Infinity,

                                duration: 3,

                            }}

                        >

                            <FaCrown className="text-4xl" />

                        </motion.div>

                        <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-semibold">

                            Mahii Gold

                        </span>

                    </div>

                    <h2 className="text-4xl font-extrabold">

                        Upgrade to Gold Membership
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-yellow-50">

                        Unlock premium offers, student savings,
                        priority benefits, and exclusive deals
                        from your favorite local businesses.

                    </p>

                    <div className="mt-8 flex items-end gap-3">

                        <span className="text-5xl font-black">

                            ₹10

                        </span>

                        <span className="pb-2 text-lg">

                            / month

                        </span>

                    </div>

                    <Link

                        to="/gold-membership"

                        className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-bold text-orange-600 transition hover:scale-105"

                    >

                        Join Gold

                        <FaArrowRight />

                    </Link>

                </div>

                {/* Right */}

                <div className="rounded-3xl bg-white/15 p-6 backdrop-blur-md">

                    <h3 className="mb-6 text-2xl font-bold text-white">

                        Membership Benefits

                    </h3>

                    <div className="space-y-4">

                        {

                            benefits.map(item => (

                                <div

                                    key={item}

                                    className="flex items-center gap-3 rounded-xl bg-white/10 p-4"

                                >

                                    <FaCheckCircle className="text-green-300 text-xl" />

                                    <span className="text-white">

                                        {item}

                                    </span>

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>

        </motion.section>

    );

}
