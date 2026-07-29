export function toStockResponse(stock) {

    if (!stock) {
        return null;
    }

    return {

        id: stock._id,

        product: stock.product,

        warehouse: stock.warehouse,

        availableQuantity: stock.availableQuantity,

        reservedQuantity: stock.reservedQuantity,

        damagedQuantity: stock.damagedQuantity,

        inTransitQuantity: stock.inTransitQuantity,

        reorderLevel: stock.reorderLevel,

        maximumLevel: stock.maximumLevel,

        lastPurchasePrice: stock.lastPurchasePrice,

        averageCost: stock.averageCost,

        createdAt: stock.createdAt,

        updatedAt: stock.updatedAt

    };

}
