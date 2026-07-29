export function toGRNResponse(grn) {

    if (!grn) {
        return null;
    }

    return {

        id: grn._id,

        grnNumber: grn.grnNumber,

        purchaseOrder: grn.purchaseOrder,

        supplier: grn.supplier,

        warehouse: grn.warehouse,

        receivedDate: grn.receivedDate,

        invoiceNumber: grn.invoiceNumber,

        vehicleNumber: grn.vehicleNumber,

        receivedBy: grn.receivedBy,

        items: grn.items,

        remarks: grn.remarks,

        createdAt: grn.createdAt,

        updatedAt: grn.updatedAt

    };

}
