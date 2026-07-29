import useInventory from "../hooks/useInventory";

import InventorySummaryCards from "../components/InventorySummaryCards";

import InventoryTable from "../components/InventoryTable";

export default function InventoryDashboard() {

    const {

        inventory,

        loading,

    } = useInventory();

    if (loading)
        return <>Loading...</>;

    return (

        <div className="p-8 space-y-8">

            <h1 className="text-3xl font-bold">

                Inventory Dashboard

            </h1>

            <InventorySummaryCards

                inventory={inventory}

            />

            <InventoryTable

                products={inventory.products}

            />

        </div>

    );

}
