export function toPurchaseInvoiceResponse(invoice) {

    if (!invoice) {
        return null;
    }

    return {

        id: invoice._id,

        invoiceNumber: invoice.invoiceNumber,

        purchaseOrder: invoice.purchaseOrder,

        grn: invoice.grn,

        supplier: invoice.supplier,

        invoiceDate: invoice.invoiceDate,

        dueDate: invoice.dueDate,

        status: invoice.status,

        subtotal: invoice.subtotal,

        discountAmount: invoice.discountAmount,

        taxAmount: invoice.taxAmount,

        grandTotal: invoice.grandTotal,

        items: invoice.items,

        remarks: invoice.remarks,

        createdBy: invoice.createdBy,

        createdAt: invoice.createdAt,

        updatedAt: invoice.updatedAt

    };

}
