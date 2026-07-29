import React from "react";
import usePendingShops from "../hooks/usePendingShops";
import PendingShopsTable from "../components/PendingShopsTable";

export default function PendingShopsPage() {

    const { shops, loading, refresh } = usePendingShops();

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Pending Shops</h2>
                <button onClick={refresh} className="px-3 py-1 bg-blue-500 text-white rounded">Refresh</button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <PendingShopsTable shops={shops} />
            )}

        </div>
    );

}
