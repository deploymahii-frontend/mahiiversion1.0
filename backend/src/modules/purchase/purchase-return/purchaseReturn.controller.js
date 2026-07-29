import * as purchaseReturnService from "./purchaseReturn.service.js";

/*
|--------------------------------------------------------------------------
| Create Purchase Return
|--------------------------------------------------------------------------
*/

export async function createPurchaseReturn(req, res, next) {

    try {

        const purchaseReturn =
            await purchaseReturnService.createPurchaseReturn({

                ...req.body,

                createdBy: req.user._id

            });

        return res.status(201).json({

            success: true,

            message: "Purchase Return created successfully.",

            data: purchaseReturn

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Update Purchase Return
|--------------------------------------------------------------------------
*/

export async function updatePurchaseReturn(req, res, next) {

    try {

        const purchaseReturn =
            await purchaseReturnService.updatePurchaseReturn(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Purchase Return updated successfully.",

            data: purchaseReturn

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Delete Purchase Return
|--------------------------------------------------------------------------
*/

export async function deletePurchaseReturn(req, res, next) {

    try {

        await purchaseReturnService.deletePurchaseReturn(

            req.params.id

        );

        return res.status(200).json({

            success: true,

            message: "Purchase Return deleted successfully."

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Purchase Return Details
|--------------------------------------------------------------------------
*/

export async function getPurchaseReturn(req, res, next) {

    try {

        const purchaseReturn =
            await purchaseReturnService.getPurchaseReturn(

                req.params.id

            );

        return res.status(200).json({

            success: true,

            data: purchaseReturn

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Purchase Return List
|--------------------------------------------------------------------------
*/

export async function getPurchaseReturns(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const purchaseReturns =
            await purchaseReturnService.getPurchaseReturns(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: purchaseReturns

        });

    } catch (error) {

        next(error);

    }

}
