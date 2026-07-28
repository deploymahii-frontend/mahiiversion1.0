import useStockMovement from "../hooks/useStockMovement";

import StockMovementTable from "../components/StockMovementTable";

export default function StockMovementPage() {

    const {

        loading,

        movements,

    } = useStockMovement();

    if (loading)
        return <>Loading...</>;

    return (

        <div className="p-8 space-y-8">

            <h1 className="text-3xl font-bold">

                Stock Movement

            </h1>

            <StockMovementTable

                movements={movements}

            />

        </div>

    );

}
