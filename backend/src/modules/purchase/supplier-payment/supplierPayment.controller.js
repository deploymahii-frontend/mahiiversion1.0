import * as supplierPaymentService from "./supplierPayment.service.js";

/*
|--------------------------------------------------------------------------
| Create Supplier Payment
|--------------------------------------------------------------------------
*/

export async function createSupplierPayment(req, res, next) {

    try {

        const payment =
            await supplierPaymentService.createSupplierPayment({

                ...req.body,

                createdBy: req.user._id

            });

        return res.status(201).json({

            success: true,

            message: "Supplier payment created successfully.",

            data: payment

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Supplier Payment Details
|--------------------------------------------------------------------------
*/

export async function getSupplierPayment(req, res, next) {

    try {

        const payment =
            await supplierPaymentService.getSupplierPayment(

                req.params.id

            );

        return res.status(200).json({

            success: true,

            data: payment

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Supplier Payment List
|--------------------------------------------------------------------------
*/

export async function getSupplierPayments(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const payments =
            await supplierPaymentService.getSupplierPayments(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: payments

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Update Supplier Payment
|--------------------------------------------------------------------------
*/

export async function updateSupplierPayment(req, res, next) {

    try {

        const payment =
            await supplierPaymentService.updateSupplierPayment(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Supplier payment updated successfully.",

            data: payment

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Delete Supplier Payment
|--------------------------------------------------------------------------
*/

export async function deleteSupplierPayment(req, res, next) {

    try {

        await supplierPaymentService.deleteSupplierPayment(

            req.params.id

        );

        return res.status(200).json({

            success: true,

            message: "Supplier payment deleted successfully."

        });

    } catch (error) {

        next(error);

    }

}
