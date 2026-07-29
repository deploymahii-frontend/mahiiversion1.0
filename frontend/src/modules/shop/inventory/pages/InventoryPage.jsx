import { toast } from "react-hot-toast";
import useInventory from "../hooks/useInventory";
import InventoryTable from "../components/InventoryTable";
import * as inventoryService from "../services/inventory.service";

export default function InventoryPage() {

    const {
        products,
        loading,
        refresh,
    } = useInventory();

    async function saveStock(id, stock) {

        try {

            await inventoryService.updateStock(id, stock);

            toast.success("Stock updated.");

            refresh();

        } catch {

            toast.error("Unable to update stock.");

        }

    }

    if (loading)
        return <div className="p-8">Loading Inventory...</div>;

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-8">

                Inventory

            </h1>

            <InventoryTable
                products={products}
                updateStock={saveStock}
            />

        </div>

    );

}
