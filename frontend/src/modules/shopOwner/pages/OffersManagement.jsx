// src/modules/shopOwner/pages/OffersManagement.jsx

import { useState } from "react";
import { FaPlus, FaTag, FaTrash, FaEdit } from "react-icons/fa";

export default function OffersManagement() {
    const [offers, setOffers] = useState([]);

    function removeOffer(id) {
        setOffers(previous => previous.filter(offer => offer._id !== id));
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Offers & Promotions</h1>
                        <p className="mt-2 text-gray-500">Create and manage shop offers.</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
                        <FaPlus />
                        Add New Offer
                    </button>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <div className="grid gap-6">
                        {offers.length === 0 ? (
                            <div className="rounded-3xl border border-dashed p-12 text-center text-gray-500">
                                No active offers yet. Add a promotion to boost sales.
                            </div>
                        ) : (
                            offers.map(offer => (
                                <div key={offer._id} className="flex flex-col gap-4 rounded-3xl border p-5 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="text-sm uppercase tracking-wide text-blue-600">{offer.type}</p>
                                        <h2 className="mt-2 text-2xl font-bold">{offer.title}</h2>
                                        <p className="mt-2 text-gray-600">{offer.description}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                                            {offer.discount}% off
                                        </span>
                                        <button className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => removeOffer(offer._id)}
                                            className="rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
