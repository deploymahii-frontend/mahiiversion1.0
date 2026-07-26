export function toPurchaseReturnResponse(purchaseReturn) {

    if (!purchaseReturn) {
        return null;
    }

    return {

        id: purchaseReturn._id,

        returnNumber: purchaseReturn.returnNumber,

        supplier: purchaseReturn.supplier,

        purchaseOrder: purchaseReturn.purchaseOrder,

        purchaseInvoice: purchaseReturn.purchaseInvoice,

        grn: purchaseReturn.grn,

        warehouse: purchaseReturn.warehouse,

        returnDate: purchaseReturn.returnDate,

        status: purchaseReturn.status,

        items: purchaseReturn.items,

        totalAmount: purchaseReturn.totalAmount,

        remarks: purchaseReturn.remarks,

        createdBy: purchaseReturn.createdBy,

        createdAt: purchaseReturn.createdAt,

        updatedAt: purchaseReturn.updatedAt

    };

}
