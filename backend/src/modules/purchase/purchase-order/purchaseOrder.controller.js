import * as purchaseOrderService from "./purchaseOrder.service.js";

/*
|--------------------------------------------------------------------------
| Create Purchase Order
|--------------------------------------------------------------------------
*/

export async function createPurchaseOrder(req, res, next) {

    try {

        const purchaseOrder =
            await purchaseOrderService.createPurchaseOrder({

                ...req.body,

                createdBy: req.user._id

            });

        return res.status(201).json({

            success: true,

            message: "Purchase Order created successfully.",

            data: purchaseOrder

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Update Purchase Order
|--------------------------------------------------------------------------
*/

export async function updatePurchaseOrder(req, res, next) {

    try {

        const purchaseOrder =
            await purchaseOrderService.updatePurchaseOrder(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Purchase Order updated successfully.",

            data: purchaseOrder

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Delete Purchase Order
|--------------------------------------------------------------------------
*/

export async function deletePurchaseOrder(req, res, next) {

    try {

        await purchaseOrderService.deletePurchaseOrder(

            req.params.id

        );

        return res.status(200).json({

            success: true,

            message: "Purchase Order deleted successfully."

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Purchase Order Details
|--------------------------------------------------------------------------
*/

export async function getPurchaseOrder(req, res, next) {

    try {

        const purchaseOrder =
            await purchaseOrderService.getPurchaseOrder(

                req.params.id

            );

        return res.status(200).json({

            success: true,

            data: purchaseOrder

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Purchase Order List
|--------------------------------------------------------------------------
*/

export async function getPurchaseOrders(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const purchaseOrders =
            await purchaseOrderService.getPurchaseOrders(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: purchaseOrders

        });

    } catch (error) {

        next(error);

    }

}
