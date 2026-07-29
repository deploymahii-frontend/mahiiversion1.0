import warehouseRepository from "./warehouse.repository.js";

/*
|--------------------------------------------------------------------------
| Create Warehouse
|--------------------------------------------------------------------------
*/

export async function createWarehouse(data) {

    const exists =
        await warehouseRepository.findByCode(data.code);

    if (exists) {

        throw new Error("Warehouse code already exists.");

    }

    return warehouseRepository.create(data);

}

/*
|--------------------------------------------------------------------------
| Update Warehouse
|--------------------------------------------------------------------------
*/

export async function updateWarehouse(id, data) {

    if (data.code) {

        const warehouse =
            await warehouseRepository.findByCode(data.code);

        if (warehouse && warehouse._id.toString() !== id) {

            throw new Error("Warehouse code already exists.");

        }

    }

    return warehouseRepository.update(id, data);

}

/*
|--------------------------------------------------------------------------
| Delete Warehouse
|--------------------------------------------------------------------------
*/

export async function deleteWarehouse(id) {

    const warehouse =
        await warehouseRepository.findById(id);

    if (!warehouse) {

        throw new Error("Warehouse not found.");

    }

    return warehouseRepository.delete(id);

}

/*
|--------------------------------------------------------------------------
| Get Warehouse
|--------------------------------------------------------------------------
*/

export async function getWarehouse(id) {

    const warehouse =
        await warehouseRepository.findById(id);

    if (!warehouse) {

        throw new Error("Warehouse not found.");

    }

    return warehouse;

}

/*
|--------------------------------------------------------------------------
| Warehouse List
|--------------------------------------------------------------------------
*/

export async function getWarehouses(page, limit) {

    return warehouseRepository.paginate(
        {},
        page,
        limit
    );

}

/*
|--------------------------------------------------------------------------
| Warehouse Statistics
|--------------------------------------------------------------------------
*/

export async function getWarehouseStatistics() {

    return warehouseRepository.statistics();

}
