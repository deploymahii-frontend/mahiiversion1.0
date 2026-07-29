import * as purchaseInvoiceService from "./purchaseInvoice.service.js";

/*
|--------------------------------------------------------------------------
| Create Purchase Invoice
|--------------------------------------------------------------------------
*/

export async function createPurchaseInvoice(req, res, next) {

    try {

        const invoice =
            await purchaseInvoiceService.createPurchaseInvoice({

                ...req.body,

                createdBy: req.user._id

            });

        return res.status(201).json({

            success: true,

            message: "Purchase Invoice created successfully.",

            data: invoice

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Update Purchase Invoice
|--------------------------------------------------------------------------
*/

export async function updatePurchaseInvoice(req, res, next) {

    try {

        const invoice =
            await purchaseInvoiceService.updatePurchaseInvoice(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Purchase Invoice updated successfully.",

            data: invoice

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Delete Purchase Invoice
|--------------------------------------------------------------------------
*/

export async function deletePurchaseInvoice(req, res, next) {

    try {

        await purchaseInvoiceService.deletePurchaseInvoice(

            req.params.id

        );

        return res.status(200).json({

            success: true,

            message: "Purchase Invoice deleted successfully."

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Purchase Invoice Details
|--------------------------------------------------------------------------
*/

export async function getPurchaseInvoice(req, res, next) {

    try {

        const invoice =
            await purchaseInvoiceService.getPurchaseInvoice(

                req.params.id

            );

        return res.status(200).json({

            success: true,

            data: invoice

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Purchase Invoice List
|--------------------------------------------------------------------------
*/

export async function getPurchaseInvoices(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const invoices =
            await purchaseInvoiceService.getPurchaseInvoices(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: invoices

        });

    } catch (error) {

        next(error);

    }

}
