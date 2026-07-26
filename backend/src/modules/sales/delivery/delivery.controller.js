import * as deliveryService from "./delivery.service.js";

export async function createDelivery(req, res, next) {

    try {

        const delivery =
            await deliveryService.createDelivery(
                req.body
            );

        return res.status(201).json({

            success: true,

            message: "Delivery created successfully.",

            data: delivery

        });

    } catch (error) {

        next(error);

    }

}

export async function updateDelivery(req, res, next) {

    try {

        const delivery =
            await deliveryService.updateDelivery(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Delivery updated successfully.",

            data: delivery

        });

    } catch (error) {

        next(error);

    }

}

export async function deleteDelivery(req, res, next) {

    try {

        await deliveryService.deleteDelivery(
            req.params.id
        );

        return res.status(200).json({

            success: true,

            message: "Delivery deleted successfully."

        });

    } catch (error) {

        next(error);

    }

}

export async function getDelivery(req, res, next) {

    try {

        const delivery =
            await deliveryService.getDelivery(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            data: delivery

        });

    } catch (error) {

        next(error);

    }

}

export async function getDeliveries(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const deliveries =
            await deliveryService.getDeliveries(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: deliveries

        });

    } catch (error) {

        next(error);

    }

}
