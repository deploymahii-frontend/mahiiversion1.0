import purchaseInvoiceRepository from "./purchaseInvoice.repository.js";

import purchaseOrderRepository from "../purchase-order/purchaseOrder.repository.js";

import grnRepository from "../grn/grn.repository.js";

/*
|--------------------------------------------------------------------------
| Create Purchase Invoice
|--------------------------------------------------------------------------
*/

export async function createPurchaseInvoice(data) {

    const exists =
        await purchaseInvoiceRepository.findByInvoiceNumber(
            data.invoiceNumber
        );

    if (exists) {

        throw new Error(
            "Purchase Invoice already exists."
        );

    }

    const purchaseOrder =
        await purchaseOrderRepository.findById(
            data.purchaseOrder
        );

    if (!purchaseOrder) {

        throw new Error(
            "Purchase Order not found."
        );

    }

    const grn =
        await grnRepository.findById(
            data.grn
        );

    if (!grn) {

        throw new Error(
            "GRN not found."
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Three Way Matching
    |--------------------------------------------------------------------------
    */

    if (
        String(grn.purchaseOrder._id) !==
        String(purchaseOrder._id)
    ) {

        throw new Error(
            "GRN does not belong to Purchase Order."
        );

    }

    let subtotal = 0;

    for (const item of data.items) {

        item.lineTotal =
            item.quantity * item.unitPrice;

        subtotal += item.lineTotal;

    }

    data.subtotal = subtotal;

    data.grandTotal =
        subtotal +
        (data.taxAmount || 0) -
        (data.discountAmount || 0);

    return purchaseInvoiceRepository.create(
        data
    );

}

/*
|--------------------------------------------------------------------------
| Invoice Details
|--------------------------------------------------------------------------
*/

export async function getPurchaseInvoice(id) {

    return purchaseInvoiceRepository.findById(id);

}

/*
|--------------------------------------------------------------------------
| Invoice List
|--------------------------------------------------------------------------
*/

export async function getPurchaseInvoices(page, limit) {

    return purchaseInvoiceRepository.paginate(
        {},
        page,
        limit
    );

}

/*
|--------------------------------------------------------------------------
| Update Invoice
|--------------------------------------------------------------------------
*/

export async function updatePurchaseInvoice(
    id,
    data
) {

    return purchaseInvoiceRepository.update(
        id,
        data
    );

}

/*
|--------------------------------------------------------------------------
| Delete Invoice
|--------------------------------------------------------------------------
*/

export async function deletePurchaseInvoice(
    id
) {

    return purchaseInvoiceRepository.delete(id);

}
