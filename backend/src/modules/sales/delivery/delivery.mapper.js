export function toDeliveryResponse(delivery) {

    if (!delivery) {

        return null;

    }

    return {

        id: delivery._id,

        deliveryNumber: delivery.deliveryNumber,

        salesOrder: delivery.salesOrder,

        customer: delivery.customer,

        warehouse: delivery.warehouse,

        deliveryDate: delivery.deliveryDate,

        transporter: delivery.transporter,

        vehicleNumber: delivery.vehicleNumber,

        trackingNumber: delivery.trackingNumber,

        remarks: delivery.remarks,

        items: delivery.items,

        status: delivery.status,

        createdAt: delivery.createdAt,

        updatedAt: delivery.updatedAt

    };

}
