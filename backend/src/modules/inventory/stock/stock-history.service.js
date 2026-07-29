import StockHistory from "./stock-history.model.js";

export async function getHistory(product) {

    return StockHistory.find({

        product

    })

        .populate("warehouse")

        .populate("createdBy")

        .sort({

            createdAt: -1

        });

}

export async function getWarehouseHistory(

    warehouse

) {

    return StockHistory.find({

        warehouse

    })

        .populate("product")

        .populate("createdBy")

        .sort({

            createdAt: -1

        });

}
