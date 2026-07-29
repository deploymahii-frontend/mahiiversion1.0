// src/modules/customer/pages/ShopDetailsPage.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
    FaMapMarkerAlt,
    FaClock,
    FaStar,
    FaTag,
} from "react-icons/fa";

import * as exploreService from "../services/explore.service";
import ImageGallery from "../components/ImageGallery";
import ProductGrid from "../components/ProductGrid";
import ReviewsSection from "../components/ReviewsSection";
import RelatedShops from "../components/RelatedShops";

export default function ShopDetailsPage() {
    const { slug } = useParams();
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadShop() {
            try {
                const { data } = await exploreService.getShop(slug);
                setShop(data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        if (slug) {
            loadShop();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    if (error || !shop) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                    <h2 className="text-2xl font-bold">Shop not found</h2>
                    <p className="mt-3 text-gray-500">Try searching for another shop or return to explore.</p>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-gray-50 min-h-screen pb-16">
            <Helmet>
                <title>{shop.name} | Mahii</title>
            </Helmet>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
                    <div className="space-y-8">
                        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                            <ImageGallery images={shop.images || [shop.image]} />
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-sm">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-900">{shop.name}</h1>
                                    <p className="mt-3 text-gray-600">{shop.description}</p>
                                </div>
                                <div className="rounded-3xl bg-blue-50 px-5 py-4 text-center">
                                    <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Rating</p>
                                    <p className="mt-2 flex items-center gap-2 text-3xl font-bold text-blue-700">
                                        <FaStar />
                                        {shop.rating || "4.8"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-3xl bg-gray-50 p-5">
                                    <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Category</p>
                                    <p className="mt-2 text-lg font-semibold text-gray-900">{shop.category}</p>
                                </div>
                                <div className="rounded-3xl bg-gray-50 p-5">
                                    <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Location</p>
                                    <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                                        <FaMapMarkerAlt />
                                        {shop.address || shop.location || "Nearby"}
                                    </p>
                                </div>
                                <div className="rounded-3xl bg-gray-50 p-5">
                                    <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Delivery</p>
                                    <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                                        <FaClock />
                                        {shop.deliveryTime || "30-40 min"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-sm">
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <FaTag />
                                <span>{shop.offerMessage || "Special offers available for Mahii members."}</span>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-2xl font-bold text-gray-900">Menu Highlights</h2>
                                <p className="mt-3 text-gray-600">{shop.highlights || "Fresh meals, quick delivery, and chef-recommended dishes."}</p>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                            <ReviewsSection reviews={shop.reviews || []} />
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900">Quick Details</h2>
                            <dl className="mt-6 space-y-4 text-sm text-gray-600">
                                <div className="flex justify-between gap-4">
                                    <dt>Delivery fee</dt>
                                    <dd>₹{shop.deliveryFee ?? 0}</dd>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <dt>Minimum order</dt>
                                    <dd>₹{shop.minimumOrder ?? 0}</dd>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <dt>Open status</dt>
                                    <dd>{shop.isOpen ? "Open" : "Closed"}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900">Related Shops</h2>
                            <RelatedShops shops={shop.relatedShops || []} />
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
