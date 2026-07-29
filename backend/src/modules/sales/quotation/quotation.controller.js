import * as quotationService from "./quotation.service.js";

/*
|--------------------------------------------------------------------------
| Create Quotation
|--------------------------------------------------------------------------
*/

export async function createQuotation(req, res, next) {

    try {

        const quotation =
            await quotationService.createQuotation(
                req.body
            );

        return res.status(201).json({

            success: true,

            message: "Quotation created successfully.",

            data: quotation

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Update Quotation
|--------------------------------------------------------------------------
*/

export async function updateQuotation(req, res, next) {

    try {

        const quotation =
            await quotationService.updateQuotation(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Quotation updated successfully.",

            data: quotation

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Delete Quotation
|--------------------------------------------------------------------------
*/

export async function deleteQuotation(req, res, next) {

    try {

        await quotationService.deleteQuotation(
            req.params.id
        );

        return res.status(200).json({

            success: true,

            message: "Quotation deleted successfully."

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Get Quotation
|--------------------------------------------------------------------------
*/

export async function getQuotation(req, res, next) {

    try {

        const quotation =
            await quotationService.getQuotation(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            data: quotation

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Get Quotations
|--------------------------------------------------------------------------
*/

export async function getQuotations(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const quotations =
            await quotationService.getQuotations(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: quotations

        });

    } catch (error) {

        next(error);

    }

}
