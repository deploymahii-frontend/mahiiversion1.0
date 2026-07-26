import supplierRepository from "./supplier.repository.js";

/*
|--------------------------------------------------------------------------
| Create Supplier
|--------------------------------------------------------------------------
*/

export async function createSupplier(data) {

    const exists =
        await supplierRepository.findByCode(
            data.supplierCode
        );

    if (exists) {

        throw new Error("Supplier code already exists.");

    }

    return supplierRepository.create(data);

}

/*
|--------------------------------------------------------------------------
| Update Supplier
|--------------------------------------------------------------------------
*/

export async function updateSupplier(id, data) {

    const supplier =
        await supplierRepository.findById(id);

    if (!supplier) {

        throw new Error("Supplier not found.");

    }

    if (data.supplierCode) {

        const exists =
            await supplierRepository.findByCode(
                data.supplierCode
            );

        if (

            exists &&

            exists._id.toString() !== id

        ) {

            throw new Error("Supplier code already exists.");

        }

    }

    return supplierRepository.update(id, data);

}

/*
|--------------------------------------------------------------------------
| Delete Supplier
|--------------------------------------------------------------------------
*/

export async function deleteSupplier(id) {

    const supplier =
        await supplierRepository.findById(id);

    if (!supplier) {

        throw new Error("Supplier not found.");

    }

    return supplierRepository.delete(id);

}

/*
|--------------------------------------------------------------------------
| Supplier Details
|--------------------------------------------------------------------------
*/

export async function getSupplier(id) {

    return supplierRepository.findById(id);

}

/*
|--------------------------------------------------------------------------
| Supplier List
|--------------------------------------------------------------------------
*/

export async function getSuppliers(page, limit) {

    return supplierRepository.paginate(
        {},
        page,
        limit
    );

}
