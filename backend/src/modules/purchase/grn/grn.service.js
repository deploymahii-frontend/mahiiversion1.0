import mongoose from "mongoose";

import grnRepository from "./grn.repository.js";

import purchaseOrderRepository from "../purchase-order/purchaseOrder.repository.js";

import stockRepository from "../../inventory/stock/stock.repository.js";

import StockHistory from "../../inventory/stock/stock-history.model.js";

/*
|--------------------------------------------------------------------------
| Create GRN
|--------------------------------------------------------------------------
*/

export async function createGRN(data) {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const purchaseOrder =
            await purchaseOrderRepository.findById(
                data.purchaseOrder
            );

        if (!purchaseOrder) {

            throw new Error("Purchase Order not found.");

        }

        const grn =
            await grnRepository.create(data);

        for (const item of data.items) {

            const stock =
                await stockRepository.findOne(

                    item.product,

                    purchaseOrder.warehouse

                );

            if (!stock) {

                throw new Error(

                    "Stock record not found."

                );

            }

            const opening =
                stock.availableQuantity;

            stock.availableQuantity +=
                item.acceptedQuantity;

            await stock.save({
                session
            });

            await StockHistory.create([{

                product: item.product,

                warehouse:
                    purchaseOrder.warehouse,

                transactionType:
                    "PURCHASE",

                quantity:
                    item.acceptedQuantity,

                openingStock:
                    opening,

                closingStock:
                    stock.availableQuantity,

                referenceNumber:
                    grn.grnNumber,

                remarks:
                    "Goods Receipt",

                createdBy:
                    data.receivedBy

            }], {
                session
            });

        }

        await session.commitTransaction();

        session.endSession();

        return grn;

    } catch (error) {

        await session.abortTransaction();

        session.endSession();

        throw error;

    }

}

/*
|--------------------------------------------------------------------------
| Get GRN
|--------------------------------------------------------------------------
*/

export async function getGRN(id) {

    return grnRepository.findById(id);

}

/*
|--------------------------------------------------------------------------
| Get GRNs
|--------------------------------------------------------------------------
*/

export async function getGRNs(page, limit) {

    return grnRepository.paginate(
        {},
        page,
        limit
    );

}
