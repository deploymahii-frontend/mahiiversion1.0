export function toPurchaseOrderResponse(purchaseOrder) {

    if (!purchaseOrder) {
        return null;
    }

    return {

        id: purchaseOrder._id,

        poNumber: purchaseOrder.poNumber,

        supplier: purchaseOrder.supplier,

        warehouse: purchaseOrder.warehouse,

        orderDate: purchaseOrder.orderDate,

        expectedDeliveryDate: purchaseOrder.expectedDeliveryDate,

        status: purchaseOrder.status,

        items: purchaseOrder.items,

        subtotal: purchaseOrder.subtotal,

        discountAmount: purchaseOrder.discountAmount,

        taxAmount: purchaseOrder.taxAmount,

        shippingAmount: purchaseOrder.shippingAmount,

        grandTotal: purchaseOrder.grandTotal,

        notes: purchaseOrder.notes,

        createdBy: purchaseOrder.createdBy,

        createdAt: purchaseOrder.createdAt,

        updatedAt: purchaseOrder.updatedAt

    };

}
