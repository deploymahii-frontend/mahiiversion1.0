import mongoose from "mongoose";

import purchaseReturnRepository from "./purchaseReturn.repository.js";

import purchaseInvoiceRepository from "../purchase-invoice/purchaseInvoice.repository.js";

import stockRepository from "../../inventory/stock/stock.repository.js";

import StockHistory from "../../inventory/stock/stock-history.model.js";

/*
|--------------------------------------------------------------------------
| Create Purchase Return
|--------------------------------------------------------------------------
*/

export async function createPurchaseReturn(data) {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const invoice =
            await purchaseInvoiceRepository.findById(
                data.purchaseInvoice
            );

        if (!invoice) {

            throw new Error(
                "Purchase Invoice not found."
            );

        }

        let total = 0;

        for (const item of data.items) {

            item.lineTotal =
                item.quantity * item.unitPrice;

            total += item.lineTotal;

            const stock =
                await stockRepository.findOne(

                    item.product,

                    data.warehouse

                );

            if (!stock) {

                throw new Error(
                    "Stock not found."
                );

            }

            if (
                stock.availableQuantity <
                item.quantity
            ) {

                throw new Error(
                    "Insufficient stock."
                );

            }

            const opening =
                stock.availableQuantity;

            stock.availableQuantity -=
                item.quantity;

            await stock.save({
                session
            });

            await StockHistory.create([{ 

                product: item.product,

                warehouse: data.warehouse,

                transactionType:
                    "PURCHASE_RETURN",

                quantity:
                    -item.quantity,

                openingStock:
                    opening,

                closingStock:
                    stock.availableQuantity,

                referenceNumber:
                    data.returnNumber,

                remarks:
                    item.reason,

                createdBy:
                    data.createdBy

            }], {
                session
            });

        }

        data.totalAmount = total;

        const purchaseReturn =
            await purchaseReturnRepository.create(
                data
            );

        await session.commitTransaction();

        session.endSession();

        return purchaseReturn;

    } catch (error) {

        await session.abortTransaction();

        session.endSession();

        throw error;

    }

}

/*
|--------------------------------------------------------------------------
| Details
|--------------------------------------------------------------------------
*/

export async function getPurchaseReturn(id) {

    return purchaseReturnRepository.findById(id);

}

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

export async function getPurchaseReturns(page, limit) {

    return purchaseReturnRepository.paginate(
        {},
        page,
        limit
    );

}

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

export async function updatePurchaseReturn(
    id,
    data
) {

    return purchaseReturnRepository.update(
        id,
        data
    );

}

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

export async function deletePurchaseReturn(
    id
) {

    return purchaseReturnRepository.delete(id);

}
