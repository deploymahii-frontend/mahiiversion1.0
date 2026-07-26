import purchaseOrderRepository from "./purchaseOrder.repository.js";

import supplierRepository from "../../inventory/supplier/supplier.repository.js";

import warehouseRepository from "../../inventory/warehouse/warehouse.repository.js";

/*
|--------------------------------------------------------------------------
| Create Purchase Order
|--------------------------------------------------------------------------
*/

export async function createPurchaseOrder(data) {

    const exists =
        await purchaseOrderRepository.findByNumber(
            data.poNumber
        );

    if (exists) {

        throw new Error("Purchase Order already exists.");

    }

    const supplier =
        await supplierRepository.findById(data.supplier);

    if (!supplier) {

        throw new Error("Supplier not found.");

    }

    const warehouse =
        await warehouseRepository.findById(data.warehouse);

    if (!warehouse) {

        throw new Error("Warehouse not found.");

    }

    let subtotal = 0;

    for (const item of data.items) {

        item.lineTotal =
            item.quantity * item.purchasePrice;

        subtotal += item.lineTotal;

    }

    data.subtotal = subtotal;

    data.grandTotal =
        subtotal +
        (data.taxAmount || 0) +
        (data.shippingAmount || 0) -
        (data.discountAmount || 0);

    return purchaseOrderRepository.create(data);

}

/*
|--------------------------------------------------------------------------
| Update Purchase Order
|--------------------------------------------------------------------------
*/

export async function updatePurchaseOrder(id, data) {

    const purchaseOrder =
        await purchaseOrderRepository.findById(id);

    if (!purchaseOrder) {

        throw new Error("Purchase Order not found.");

    }

    return purchaseOrderRepository.update(
        id,
        data
    );

}

/*
|--------------------------------------------------------------------------
| Delete Purchase Order
|--------------------------------------------------------------------------
*/

export async function deletePurchaseOrder(id) {

    const purchaseOrder =
        await purchaseOrderRepository.findById(id);

    if (!purchaseOrder) {

        throw new Error("Purchase Order not found.");

    }

    return purchaseOrderRepository.delete(id);

}

/*
|--------------------------------------------------------------------------
| Purchase Order Details
|--------------------------------------------------------------------------
*/

export async function getPurchaseOrder(id) {

    return purchaseOrderRepository.findById(id);

}

/*
|--------------------------------------------------------------------------
| Purchase Order List
|--------------------------------------------------------------------------
*/

export async function getPurchaseOrders(page, limit) {

    return purchaseOrderRepository.paginate(
        {},
        page,
        limit
    );

}
