// src/modules/customer/pages/HomePage.jsx

import { useEffect, useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

import HeroBanner from "../components/HeroBanner";
import SearchBar from "../components/SearchBar";
import CategoryGrid from "../components/CategoryGrid";
import FlashOffers from "../components/FlashOffers";
import GoldMembershipBanner from "../components/GoldMembershipBanner";
import FeaturedShops from "../components/FeaturedShops";
import NearbyShops from "../components/NearbyShops";
import TrendingSearches from "../components/TrendingSearches";

import * as homeService from "../services/home.service";

export default function HomePage() {

    const [loading, setLoading] =
        useState(true);

    const [homeData, setHomeData] =
        useState({

            banners: [],

            categories: [],

            featured: [],

            nearby: [],

            offers: [],

            trending: [],

        });

    useEffect(() => {

        loadHome();

    }, []);

    async function loadHome() {

        try {

            const { data } =
                await homeService.getHome();

            setHomeData(data.data);

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <div className="animate-spin w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full" />

            </div>

        );

    }

    return (

        <div className="bg-gray-50 min-h-screen">

            {/* Header */}

            <header className="sticky top-0 z-50 bg-white shadow-sm">

                <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold text-blue-600">

                            Mahii

                        </h1>

                    </div>

                    <div className="hidden lg:block w-[500px]">

                        <SearchBar />

                    </div>

                    <button className="flex items-center gap-2">

                        <FaMapMarkerAlt />

                        Kolhapur

                    </button>

                </div>

            </header>

            {/* Hero */}

            <HeroBanner

                banners={homeData.banners}

            />

            {/* Mobile Search */}

            <div className="lg:hidden px-4 mt-6">

                <SearchBar />

            </div>

            {/* Categories */}

            <section className="max-w-7xl mx-auto px-4 mt-10">

                <CategoryGrid

                    categories={homeData.categories}

                />

            </section>

            {/* Flash Sale */}

            <section className="max-w-7xl mx-auto px-4 mt-12">

                <FlashOffers

                    offers={homeData.offers}

                />

            </section>

            {/* Gold */}

            <section className="max-w-7xl mx-auto px-4 mt-12">

                <GoldMembershipBanner />

            </section>

            {/* Featured */}

            <section className="max-w-7xl mx-auto px-4 mt-12">

                <FeaturedShops

                    shops={homeData.featured}

                />

            </section>

            {/* Nearby */}

            <section className="max-w-7xl mx-auto px-4 mt-12">

                <NearbyShops

                    shops={homeData.nearby}

                />

            </section>

            {/* Trending */}

            <section className="max-w-7xl mx-auto px-4 mt-12 mb-16">

                <TrendingSearches

                    items={homeData.trending}

                />

            </section>

        </div>

    );

}
