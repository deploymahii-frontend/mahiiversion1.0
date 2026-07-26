import Joi from "joi";

export const createPurchaseOrderSchema = Joi.object({

    poNumber: Joi.string().required(),

    supplier: Joi.string().required(),

    warehouse: Joi.string().required(),

    expectedDeliveryDate: Joi.date(),

    discountAmount: Joi.number().default(0),

    taxAmount: Joi.number().default(0),

    shippingAmount: Joi.number().default(0),

    notes: Joi.string().allow(""),

    items: Joi.array().items(

        Joi.object({

            product: Joi.string().required(),

            quantity: Joi.number().positive().required(),

            purchasePrice: Joi.number().positive().required(),

            taxPercentage: Joi.number().default(0),

            discountPercentage: Joi.number().default(0)

        })

    ).min(1).required()

});

export const updatePurchaseOrderSchema =
    createPurchaseOrderSchema.fork(

        [

            "poNumber",

            "supplier",

            "warehouse",

            "items"

        ],

        schema => schema.optional()

    );
