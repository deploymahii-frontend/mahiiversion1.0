import quotationRepository from "./quotation.repository.js";

/*
|--------------------------------------------------------------------------
| Create Quotation
|--------------------------------------------------------------------------
*/

export async function createQuotation(data) {

    const exists =
        await quotationRepository.findByNumber(
            data.quotationNumber
        );

    if (exists) {

        throw new Error(
            "Quotation number already exists."
        );

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

    return quotationRepository.create(data);

}

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

export async function updateQuotation(
    id,
    data
) {

    return quotationRepository.update(
        id,
        data
    );

}

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

export async function deleteQuotation(
    id
) {

    return quotationRepository.delete(id);

}

/*
|--------------------------------------------------------------------------
| Details
|--------------------------------------------------------------------------
*/

export async function getQuotation(
    id
) {

    return quotationRepository.findById(
        id
    );

}

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

export async function getQuotations(
    page,
    limit
) {

    return quotationRepository.paginate(
        {},
        page,
        limit
    );

}
