import deliveryRepository from "./delivery.repository.js";
import salesOrderRepository from "../sales-order/salesOrder.repository.js";

/*
|--------------------------------------------------------------------------
| Create Delivery
|--------------------------------------------------------------------------
*/

export async function createDelivery(data) {

    const exists =
        await deliveryRepository.findByNumber(
            data.deliveryNumber
        );

    if (exists) {

        throw new Error(
            "Delivery number already exists."
        );

    }

    const salesOrder =
        await salesOrderRepository.findById(
            data.salesOrder
        );

    if (!salesOrder) {

        throw new Error(
            "Sales Order not found."
        );

    }

    return deliveryRepository.create(data);

}

/*
|--------------------------------------------------------------------------
| Update Delivery
|--------------------------------------------------------------------------
*/

export async function updateDelivery(
    id,
    data
) {

    return deliveryRepository.update(
        id,
        data
    );

}

/*
|--------------------------------------------------------------------------
| Delete Delivery
|--------------------------------------------------------------------------
*/

export async function deleteDelivery(
    id
) {

    return deliveryRepository.delete(
        id
    );

}

/*
|--------------------------------------------------------------------------
| Delivery Details
|--------------------------------------------------------------------------
*/

export async function getDelivery(
    id
) {

    return deliveryRepository.findById(
        id
    );

}

/*
|--------------------------------------------------------------------------
| Delivery List
|--------------------------------------------------------------------------
*/

export async function getDeliveries(
    page,
    limit
) {

    return deliveryRepository.paginate(
        {},
        page,
        limit
    );

}
