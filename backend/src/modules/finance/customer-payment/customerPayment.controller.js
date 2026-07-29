import * as customerPaymentService from "./customerPayment.service.js";

/*
|--------------------------------------------------------------------------
| Create Customer Payment
|--------------------------------------------------------------------------
*/

export async function createCustomerPayment(req, res, next) {

    try {

        const payment =
            await customerPaymentService.createCustomerPayment(
                req.body
            );

        return res.status(201).json({

            success: true,

            message: "Customer payment recorded successfully.",

            data: payment

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Update Customer Payment
|--------------------------------------------------------------------------
*/

export async function updateCustomerPayment(req, res, next) {

    try {

        const payment =
            await customerPaymentService.updateCustomerPayment(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Customer payment updated successfully.",

            data: payment

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Delete Customer Payment
|--------------------------------------------------------------------------
*/

export async function deleteCustomerPayment(req, res, next) {

    try {

        await customerPaymentService.deleteCustomerPayment(
            req.params.id
        );

        return res.status(200).json({

            success: true,

            message: "Customer payment deleted successfully."

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Payment Details
|--------------------------------------------------------------------------
*/

export async function getCustomerPayment(req, res, next) {

    try {

        const payment =
            await customerPaymentService.getCustomerPayment(
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
| Payment List
|--------------------------------------------------------------------------
*/

export async function getCustomerPayments(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const payments =
            await customerPaymentService.getCustomerPayments(

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
