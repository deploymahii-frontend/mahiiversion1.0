// src/modules/customer/components/FilterSidebar.jsx

export default function FilterSidebar({
    activeFilters = {},
    onFilterChange = () => {},
}) {
    const ratings = [4, 4.5, 5];

    return (
        <aside className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                    type="button"
                    onClick={() =>
                        onFilterChange({
                            openNow: false,
                            pureVeg: false,
                            minRating: 0,
                        })
                    }
                    className="text-sm text-blue-600 hover:underline"
                >
                    Clear
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                        Availability
                    </h3>
                    <label className="flex items-center gap-3 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={activeFilters.openNow || false}
                            onChange={(event) =>
                                onFilterChange({
                                    ...activeFilters,
                                    openNow: event.target.checked,
                                })
                            }
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        Open Now
                    </label>
                </div>

                <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                        Diet
                    </h3>
                    <label className="flex items-center gap-3 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={activeFilters.pureVeg || false}
                            onChange={(event) =>
                                onFilterChange({
                                    ...activeFilters,
                                    pureVeg: event.target.checked,
                                })
                            }
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        Pure Veg
                    </label>
                </div>

                <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                        Rating
                    </h3>
                    <div className="space-y-3">
                        {ratings.map((rating) => (
                            <label
                                key={rating}
                                className="flex items-center gap-3 text-sm text-gray-700"
                            >
                                <input
                                    type="radio"
                                    name="minRating"
                                    value={rating}
                                    checked={activeFilters.minRating === rating}
                                    onChange={() =>
                                        onFilterChange({
                                            ...activeFilters,
                                            minRating: rating,
                                        })
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                />
                                {rating}+ stars
                            </label>
                        ))}
                        <label className="flex items-center gap-3 text-sm text-gray-700">
                            <input
                                type="radio"
                                name="minRating"
                                value={0}
                                checked={!activeFilters.minRating}
                                onChange={() =>
                                    onFilterChange({
                                        ...activeFilters,
                                        minRating: 0,
                                    })
                                }
                                className="h-4 w-4 rounded border-gray-300 text-blue-600"
                            />
                            All ratings
                        </label>
                    </div>
                </div>
            </div>
        </aside>
    );
}
