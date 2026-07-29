// src/modules/customer/components/TrendingSearches.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaFire,
    FaSearch,
} from "react-icons/fa";

export default function TrendingSearches({

    items = [],

}) {

    if (!items.length) {

        return null;

    }

    return (

        <section>

            <div className="mb-6 flex items-center gap-3">

                <FaFire className="text-orange-500 text-2xl" />

                <h2 className="text-2xl font-bold">

                    Trending Searches

                </h2>

            </div>

            <div className="flex flex-wrap gap-4">

                {

                    items.map(item => (

                        <motion.div

                            key={item.keyword}

                            whileHover={{

                                scale: 1.05,

                            }}

                            whileTap={{

                                scale: 0.96,

                            }}

                        >

                            <Link

                                to={`/explore?search=${encodeURIComponent(item.keyword)}`}

                                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-white shadow hover:shadow-lg transition"

                            >

                                <FaSearch />

                                <span>

                                    {item.keyword}

                                </span>

                                {

                                    item.count !== undefined && (

                                        <span className="rounded-full bg-white/20 px-2 py-1 text-xs">

                                            {item.count}

                                        </span>

                                    )

                                }

                            </Link>

                        </motion.div>

                    ))

                }

            </div>

        </section>

    );

}
