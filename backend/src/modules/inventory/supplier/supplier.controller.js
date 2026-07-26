import * as supplierService from "./supplier.service.js";

/*
|--------------------------------------------------------------------------
| Create Supplier
|--------------------------------------------------------------------------
*/

export async function createSupplier(req, res, next) {

    try {

        const supplier =
            await supplierService.createSupplier(req.body);

        return res.status(201).json({

            success: true,

            message: "Supplier created successfully.",

            data: supplier

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Update Supplier
|--------------------------------------------------------------------------
*/

export async function updateSupplier(req, res, next) {

    try {

        const supplier =
            await supplierService.updateSupplier(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Supplier updated successfully.",

            data: supplier

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Delete Supplier
|--------------------------------------------------------------------------
*/

export async function deleteSupplier(req, res, next) {

    try {

        await supplierService.deleteSupplier(req.params.id);

        return res.status(200).json({

            success: true,

            message: "Supplier deleted successfully."

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Supplier Details
|--------------------------------------------------------------------------
*/

export async function getSupplier(req, res, next) {

    try {

        const supplier =
            await supplierService.getSupplier(req.params.id);

        return res.status(200).json({

            success: true,

            data: supplier

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Supplier List
|--------------------------------------------------------------------------
*/

export async function getSuppliers(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const suppliers =
            await supplierService.getSuppliers(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: suppliers

        });

    } catch (error) {

        next(error);

    }

}
