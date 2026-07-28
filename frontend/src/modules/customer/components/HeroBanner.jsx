// src/modules/customer/components/HeroBanner.jsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

export default function HeroBanner({

    banners = [],

}) {

    const [current, setCurrent] = useState(0);

    useEffect(() => {

        if (!banners.length) return;

        const timer = setInterval(() => {

            nextSlide();

        }, 5000);

        return () => clearInterval(timer);

    }, [current, banners]);

    function nextSlide() {

        setCurrent(previous =>

            previous === banners.length - 1

                ? 0

                : previous + 1

        );

    }

    function previousSlide() {

        setCurrent(previous =>

            previous === 0

                ? banners.length - 1

                : previous - 1

        );

    }

    if (!banners.length) {

        return (

            <div className="h-[420px] bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white">

                <h2 className="text-5xl font-bold">

                    Welcome to Mahii

                </h2>

            </div>

        );

    }

    return (

        <section className="relative overflow-hidden">

            <AnimatePresence mode="wait">

                <motion.div

                    key={current}

                    initial={{

                        opacity: 0,

                        scale: 1.05,

                    }}

                    animate={{

                        opacity: 1,

                        scale: 1,

                    }}

                    exit={{

                        opacity: 0,

                    }}

                    transition={{

                        duration: 0.5,

                    }}

                    className="relative h-[500px]"

                >

                    <img

                        src={banners[current].image}

                        alt={banners[current].title}

                        className="absolute inset-0 h-full w-full object-cover"

                    />

                    <div className="absolute inset-0 bg-black/45" />

                    <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">

                        <div className="max-w-2xl text-white">

                            <motion.h1

                                initial={{

                                    y: 30,

                                    opacity: 0,

                                }}

                                animate={{

                                    y: 0,

                                    opacity: 1,

                                }}

                                transition={{

                                    delay: 0.2,

                                }}

                                className="text-5xl lg:text-6xl font-bold"

                            >

                                {

                                    banners[current].title

                                }

                            </motion.h1>

                            <motion.p

                                initial={{

                                    y: 30,

                                    opacity: 0,

                                }}

                                animate={{

                                    y: 0,

                                    opacity: 1,

                                }}

                                transition={{

                                    delay: 0.35,

                                }}

                                className="mt-6 text-xl leading-8"

                            >

                                {

                                    banners[current]

                                        .description

                                }

                            </motion.p>

                            <motion.div

                                initial={{

                                    opacity: 0,

                                }}

                                animate={{

                                    opacity: 1,

                                }}

                                transition={{

                                    delay: 0.5,

                                }}

                                className="mt-8 flex gap-4"

                            >

                                <Link

                                    to={

                                        banners[current]

                                            .buttonLink

                                    }

                                    className="rounded-xl bg-white px-6 py-3 text-black font-semibold hover:bg-gray-100"

                                >

                                    {

                                        banners[current]

                                            .buttonText ||

                                        "Explore"

                                    }

                                </Link>

                            </motion.div>

                        </div>

                    </div>

                </motion.div>

            </AnimatePresence>

            {/* Previous */}

            <button

                onClick={previousSlide}

                className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg"

            >

                <FaChevronLeft />

            </button>

            {/* Next */}

            <button

                onClick={nextSlide}

                className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg"

            >

                <FaChevronRight />

            </button>

            {/* Indicators */}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">

                {

                    banners.map((_, index) => (

                        <button

                            key={index}

                            onClick={() =>

                                setCurrent(index)

                            }

                            className={`w-3 h-3 rounded-full transition-all ${

                                current === index

                                    ? "bg-white w-10"

                                    : "bg-white/50"

                            }`}

                        />

                    ))

                }

            </div>

        </section>

    );

}
