import * as salesOrderService from "./salesOrder.service.js";

/*
|--------------------------------------------------------------------------
| Create Sales Order
|--------------------------------------------------------------------------
*/

export async function createSalesOrder(req, res, next) {

    try {

        const order =
            await salesOrderService.createSalesOrder(
                req.body
            );

        return res.status(201).json({

            success: true,

            message: "Sales Order created successfully.",

            data: order

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Update Sales Order
|--------------------------------------------------------------------------
*/

export async function updateSalesOrder(req, res, next) {

    try {

        const order =
            await salesOrderService.updateSalesOrder(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Sales Order updated successfully.",

            data: order

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Delete Sales Order
|--------------------------------------------------------------------------
*/

export async function deleteSalesOrder(req, res, next) {

    try {

        await salesOrderService.deleteSalesOrder(
            req.params.id
        );

        return res.status(200).json({

            success: true,

            message: "Sales Order deleted successfully."

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Sales Order Details
|--------------------------------------------------------------------------
*/

export async function getSalesOrder(req, res, next) {

    try {

        const order =
            await salesOrderService.getSalesOrder(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            data: order

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Sales Order List
|--------------------------------------------------------------------------
*/

export async function getSalesOrders(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const orders =
            await salesOrderService.getSalesOrders(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: orders

        });

    } catch (error) {

        next(error);

    }

}
