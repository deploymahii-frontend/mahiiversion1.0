// src/modules/customer/components/CategoryGrid.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaUtensils,
    FaCoffee,
    FaHotel,
    FaShoppingBasket,
    FaStore,
    FaHome,
    FaCut,
    FaEllipsisH,
} from "react-icons/fa";

const iconMap = {
    restaurant: FaUtensils,
    cafe: FaCoffee,
    hotel: FaHotel,
    grocery: FaShoppingBasket,
    shop: FaStore,
    pg: FaHome,
    salon: FaCut,
};

export default function CategoryGrid({

    categories = [],

}) {

    return (

        <section>

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold">

                    Explore Categories

                </h2>

                <Link

                    to="/explore"

                    className="text-blue-600 font-medium hover:underline"

                >

                    View All

                </Link>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">

                {

                    categories.map(category => {

                        const Icon =

                            iconMap[category.slug] ||

                            FaEllipsisH;

                        return (

                            <motion.div

                                key={category._id}

                                whileHover={{

                                    y: -6,

                                    scale: 1.03,

                                }}

                                transition={{

                                    duration: 0.2,

                                }}

                            >

                                <Link

                                    to={`/explore?category=${category.slug}`}

                                    className="relative flex flex-col items-center rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition"

                                >

                                    {category.featured && (

                                        <span className="absolute right-3 top-3 rounded-full bg-yellow-400 px-2 py-1 text-[10px] font-bold uppercase">

                                            Hot

                                        </span>

                                    )}

                                    {category.image ? (

                                        <img

                                            src={category.image}

                                            alt={category.name}

                                            loading="lazy"

                                            className="h-16 w-16 rounded-full object-cover"

                                        />

                                    ) : (

                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">

                                            <Icon size={28} />

                                        </div>

                                    )}

                                    <h3 className="mt-4 text-center font-semibold">

                                        {category.name}

                                    </h3>

                                    {category.count !== undefined && (

                                        <p className="mt-1 text-sm text-gray-500">

                                            {category.count} Shops

                                        </p>

                                    )}

                                </Link>

                            </motion.div>

                        );

                    })

                }

            </div>

        </section>

    );

}
