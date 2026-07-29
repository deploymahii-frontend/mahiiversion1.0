export function toSalesOrderResponse(order) {

    if (!order) {
        return null;
    }

    return {

        id: order._id,

        salesOrderNumber: order.salesOrderNumber,

        quotation: order.quotation,

        customer: order.customer,

        orderDate: order.orderDate,

        expectedDeliveryDate: order.expectedDeliveryDate,

        items: order.items,

        subtotal: order.subtotal,

        discountTotal: order.discountTotal,

        taxTotal: order.taxTotal,

        grandTotal: order.grandTotal,

        notes: order.notes,

        status: order.status,

        createdAt: order.createdAt,

        updatedAt: order.updatedAt

    };

}
