import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthLayout({

    title,

    subtitle,

    children,

    footer,

}) {

    return (

        <div className="min-h-screen bg-gray-100">

            <div className="grid lg:grid-cols-2 min-h-screen">

                {/* Left Section */}

                <div className="hidden lg:flex relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">

                    <div className="absolute inset-0 bg-black/20" />

                    <div className="relative z-10 flex flex-col justify-center px-20 text-white">

                        <motion.h1

                            initial={{ opacity: 0, y: 20 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ duration: 0.5 }}

                            className="text-6xl font-extrabold"

                        >

                            Mahii

                        </motion.h1>

                        <motion.p

                            initial={{ opacity: 0, y: 20 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{

                                delay: 0.2,

                                duration: 0.5,

                            }}

                            className="mt-8 text-xl leading-9"

                        >

                            Discover trusted local shops,

                            restaurants, messes, cafés,

                            hotels and services in one place.

                        </motion.p>

                        <div className="mt-16 space-y-6">

                            <Feature

                                title="Verified Local Businesses"

                            />

                            <Feature

                                title="Secure Payments"

                            />

                            <Feature

                                title="Fast Delivery"

                            />

                            <Feature

                                title="Gold Membership"

                            />

                        </div>

                    </div>

                </div>

                {/* Right Section */}

                <div className="flex items-center justify-center p-6">

                    <motion.div

                        initial={{

                            opacity: 0,

                            scale: 0.95,

                        }}

                        animate={{

                            opacity: 1,

                            scale: 1,

                        }}

                        className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-10"

                    >

                        <Link

                            to="/"

                            className="font-bold text-blue-600"

                        >

                            ← Back to Home

                        </Link>

                        <div className="mt-8">

                            <h2 className="text-3xl font-bold">

                                {title}

                            </h2>

                            <p className="text-gray-500 mt-2">

                                {subtitle}

                            </p>

                        </div>

                        <div className="mt-8">

                            {children}

                        </div>

                        {footer && (

                            <div className="mt-8">

                                {footer}

                            </div>

                        )}

                    </motion.div>

                </div>

            </div>

        </div>

    );

}

function Feature({

    title,

}) {

    return (

        <div className="flex items-center gap-4">

            <div className="w-3 h-3 rounded-full bg-white" />

            <span className="text-lg">

                {title}

            </span>

        </div>

    );

}
