import * as warehouseService from "./warehouse.service.js";

/*
|--------------------------------------------------------------------------
| Create Warehouse
|--------------------------------------------------------------------------
*/

export async function createWarehouse(req, res, next) {

    try {

        const warehouse =
            await warehouseService.createWarehouse(req.body);

        return res.status(201).json({

            success: true,

            message: "Warehouse created successfully.",

            data: warehouse

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Update Warehouse
|--------------------------------------------------------------------------
*/

export async function updateWarehouse(req, res, next) {

    try {

        const warehouse =
            await warehouseService.updateWarehouse(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Warehouse updated successfully.",

            data: warehouse

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Delete Warehouse
|--------------------------------------------------------------------------
*/

export async function deleteWarehouse(req, res, next) {

    try {

        await warehouseService.deleteWarehouse(req.params.id);

        return res.status(200).json({

            success: true,

            message: "Warehouse deleted successfully."

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Get Warehouse
|--------------------------------------------------------------------------
*/

export async function getWarehouse(req, res, next) {

    try {

        const warehouse =
            await warehouseService.getWarehouse(req.params.id);

        return res.status(200).json({

            success: true,

            data: warehouse

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Warehouse List
|--------------------------------------------------------------------------
*/

export async function getWarehouses(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const warehouses =
            await warehouseService.getWarehouses(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: warehouses

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Warehouse Statistics
|--------------------------------------------------------------------------
*/

export async function statistics(req, res, next) {

    try {

        const statistics =
            await warehouseService.getWarehouseStatistics();

        return res.status(200).json({

            success: true,

            data: statistics

        });

    } catch (error) {

        next(error);

    }

}
