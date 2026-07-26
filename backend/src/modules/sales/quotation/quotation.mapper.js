export function toQuotationResponse(quotation) {

    if (!quotation) {
        return null;
    }

    return {

        id: quotation._id,

        quotationNumber: quotation.quotationNumber,

        customer: quotation.customer,

        quotationDate: quotation.quotationDate,

        validUntil: quotation.validUntil,

        items: quotation.items,

        subtotal: quotation.subtotal,

        discountTotal: quotation.discountTotal,

        taxTotal: quotation.taxTotal,

        grandTotal: quotation.grandTotal,

        notes: quotation.notes,

        status: quotation.status,

        createdAt: quotation.createdAt,

        updatedAt: quotation.updatedAt

    };

}
