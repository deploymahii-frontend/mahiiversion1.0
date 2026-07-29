import * as stockService from "./stock.service.js";
import * as historyService from "./stock-history.service.js";

/*
|--------------------------------------------------------------------------
| Create Stock
|--------------------------------------------------------------------------
*/

export async function createStock(req, res, next) {

    try {

        const stock =
            await stockService.createStock(req.body);

        return res.status(201).json({

            success: true,

            message: "Stock created successfully.",

            data: stock

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Stock List
|--------------------------------------------------------------------------
*/

export async function getStocks(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const stocks =
            await stockService.getStocks(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: stocks

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Stock Details
|--------------------------------------------------------------------------
*/

export async function getStock(req, res, next) {

    try {

        const stock =
            await stockService.getStock(req.params.id);

        return res.status(200).json({

            success: true,

            data: stock

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Increase Stock
|--------------------------------------------------------------------------
*/

export async function increaseStock(req, res, next) {

    try {

        const stock =
            await stockService.increaseStock({

                ...req.body,

                user: req.user._id

            });

        return res.status(200).json({

            success: true,

            message: "Stock increased successfully.",

            data: stock

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Decrease Stock
|--------------------------------------------------------------------------
*/

export async function decreaseStock(req, res, next) {

    try {

        const stock =
            await stockService.decreaseStock({

                ...req.body,

                user: req.user._id

            });

        return res.status(200).json({

            success: true,

            message: "Stock decreased successfully.",

            data: stock

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Product Stock History
|--------------------------------------------------------------------------
*/

export async function getHistory(req, res, next) {

    try {

        const history =
            await historyService.getHistory(

                req.params.product

            );

        return res.status(200).json({

            success: true,

            data: history

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Warehouse History
|--------------------------------------------------------------------------
*/

export async function getWarehouseHistory(req, res, next) {

    try {

        const history =
            await historyService.getWarehouseHistory(

                req.params.warehouse

            );

        return res.status(200).json({

            success: true,

            data: history

        });

    } catch (error) {

        next(error);

    }

}
