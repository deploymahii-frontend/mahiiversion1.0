import * as customerService from "./customer.service.js";

export async function createCustomer(req, res, next) {

    try {

        const customer =
            await customerService.createCustomer(
                req.body
            );

        return res.status(201).json({

            success: true,

            message: "Customer created successfully.",

            data: customer

        });

    } catch (error) {

        next(error);

    }

}

export async function updateCustomer(req, res, next) {

    try {

        const customer =
            await customerService.updateCustomer(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Customer updated successfully.",

            data: customer

        });

    } catch (error) {

        next(error);

    }

}

export async function deleteCustomer(req, res, next) {

    try {

        await customerService.deleteCustomer(

            req.params.id

        );

        return res.status(200).json({

            success: true,

            message: "Customer deleted successfully."

        });

    } catch (error) {

        next(error);

    }

}

export async function getCustomer(req, res, next) {

    try {

        const customer =
            await customerService.getCustomer(

                req.params.id

            );

        return res.status(200).json({

            success: true,

            data: customer

        });

    } catch (error) {

        next(error);

    }

}

export async function getCustomers(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const customers =
            await customerService.getCustomers(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: customers

        });

    } catch (error) {

        next(error);

    }

}
