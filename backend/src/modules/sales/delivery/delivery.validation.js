import Joi from "joi";

const itemSchema = Joi.object({

    salesOrderItemId: Joi.string().required(),

    product: Joi.string().required(),

    productCode: Joi.string().required(),

    productName: Joi.string().required(),

    orderedQuantity: Joi.number().min(1).required(),

    deliveredQuantity: Joi.number().min(1).required()

});

export const createDeliverySchema = Joi.object({

    deliveryNumber: Joi.string().required(),

    salesOrder: Joi.string().required(),

    customer: Joi.string().required(),

    warehouse: Joi.string().allow(null),

    deliveryDate: Joi.date(),

    transporter: Joi.string().allow(""),

    vehicleNumber: Joi.string().allow(""),

    trackingNumber: Joi.string().allow(""),

    remarks: Joi.string().allow(""),

    items: Joi.array()

        .items(itemSchema)

        .min(1)

        .required()

});

export const updateDeliverySchema =
    createDeliverySchema.fork(

        [

            "deliveryNumber",

            "salesOrder",

            "customer",

            "items"

        ],

        schema => schema.optional()

    );
