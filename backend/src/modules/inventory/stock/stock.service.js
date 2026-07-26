import mongoose from "mongoose";

import stockRepository from "./stock.repository.js";

import StockHistory from "./stock-history.model.js";

/*
|--------------------------------------------------------------------------
| Create Stock
|--------------------------------------------------------------------------
*/

export async function createStock(data) {

    const exists = await stockRepository.findOne(
        data.product,
        data.warehouse
    );

    if (exists) {

        throw new Error("Stock already exists.");

    }

    return stockRepository.create(data);

}

/*
|--------------------------------------------------------------------------
| Get Stock
|--------------------------------------------------------------------------
*/

export async function getStock(id) {

    return stockRepository.findById(id);

}

/*
|--------------------------------------------------------------------------
| Get Stocks
|--------------------------------------------------------------------------
*/

export async function getStocks(page, limit) {

    return stockRepository.paginate(
        {},
        page,
        limit
    );

}

/*
|--------------------------------------------------------------------------
| Increase Stock
|--------------------------------------------------------------------------
*/

export async function increaseStock({

    product,

    warehouse,

    quantity,

    referenceNumber,

    remarks,

    user

}) {

    const session =
        await mongoose.startSession();

    session.startTransaction();

    try {

        const stock =
            await stockRepository.findOne(
                product,
                warehouse
            );

        if (!stock) {

            throw new Error("Stock not found.");

        }

        const opening =
            stock.availableQuantity;

        stock.availableQuantity += quantity;

        await stock.save({ session });

        await StockHistory.create([{

            product,

            warehouse,

            transactionType: "PURCHASE",

            quantity,

            openingStock: opening,

            closingStock: stock.availableQuantity,

            referenceNumber,

            remarks,

            createdBy: user

        }], { session });

        await session.commitTransaction();

        session.endSession();

        return stock;

    } catch (error) {

        await session.abortTransaction();

        session.endSession();

        throw error;

    }

}

/*
|--------------------------------------------------------------------------
| Decrease Stock
|--------------------------------------------------------------------------
*/

export async function decreaseStock({

    product,

    warehouse,

    quantity,

    referenceNumber,

    remarks,

    user

}) {

    const session =
        await mongoose.startSession();

    session.startTransaction();

    try {

        const stock =
            await stockRepository.findOne(
                product,
                warehouse
            );

        if (!stock) {

            throw new Error("Stock not found.");

        }

        if (

            stock.availableQuantity < quantity

        ) {

            throw new Error("Insufficient stock.");

        }

        const opening =
            stock.availableQuantity;

        stock.availableQuantity -= quantity;

        await stock.save({ session });

        await StockHistory.create([{

            product,

            warehouse,

            transactionType: "SALE",

            quantity,

            openingStock: opening,

            closingStock: stock.availableQuantity,

            referenceNumber,

            remarks,

            createdBy: user

        }], { session });

        await session.commitTransaction();

        session.endSession();

        return stock;

    } catch (error) {

        await session.abortTransaction();

        session.endSession();

        throw error;

    }

}
