import salesOrderRepository from "./salesOrder.repository.js";
import quotationRepository from "../quotation/quotation.repository.js";

/*
|--------------------------------------------------------------------------
| Create Sales Order
|--------------------------------------------------------------------------
*/

export async function createSalesOrder(data) {

    const exists =
        await salesOrderRepository.findByNumber(
            data.salesOrderNumber
        );

    if (exists) {

        throw new Error(
            "Sales Order number already exists."
        );

    }

    if (data.quotation) {

        const quotation =
            await quotationRepository.findById(
                data.quotation
            );

        if (!quotation) {

            throw new Error(
                "Quotation not found."
            );

        }

    }

    let subtotal = 0;
    let discountTotal = 0;
    let taxTotal = 0;

    for (const item of data.items) {

        const lineSubtotal =
            item.quantity * item.unitPrice;

        const discount =
            Number(item.discount || 0);

        const tax =
            Number(item.tax || 0);

        item.lineTotal =
            lineSubtotal - discount + tax;

        subtotal += lineSubtotal;
        discountTotal += discount;
        taxTotal += tax;

    }

    data.subtotal = subtotal;
    data.discountTotal = discountTotal;
    data.taxTotal = taxTotal;

    data.grandTotal =
        subtotal -
        discountTotal +
        taxTotal;

    return salesOrderRepository.create(data);

}

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

export async function updateSalesOrder(
    id,
    data
) {

    return salesOrderRepository.update(
        id,
        data
    );

}

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

export async function deleteSalesOrder(
    id
) {

    return salesOrderRepository.delete(
        id
    );

}

/*
|--------------------------------------------------------------------------
| Details
|--------------------------------------------------------------------------
*/

export async function getSalesOrder(
    id
) {

    return salesOrderRepository.findById(
        id
    );

}

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

export async function getSalesOrders(
    page,
    limit
) {

    return salesOrderRepository.paginate(
        {},
        page,
        limit
    );

}
