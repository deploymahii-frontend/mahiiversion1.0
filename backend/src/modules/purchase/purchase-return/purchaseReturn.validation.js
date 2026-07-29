import Joi from "joi";

export const createPurchaseReturnSchema = Joi.object({

    returnNumber: Joi.string().required(),

    supplier: Joi.string().required(),

    purchaseOrder: Joi.string().required(),

    purchaseInvoice: Joi.string().required(),

    grn: Joi.string().required(),

    warehouse: Joi.string().required(),

    returnDate: Joi.date(),

    remarks: Joi.string().allow(""),

    items: Joi.array().items(

        Joi.object({

            product: Joi.string().required(),

            quantity: Joi.number().positive().required(),

            unitPrice: Joi.number().positive().required(),

            reason: Joi.string().required()

        })

    ).min(1).required()

});

export const updatePurchaseReturnSchema =
    createPurchaseReturnSchema.fork(

        [

            "returnNumber",

            "supplier",

            "purchaseOrder",

            "purchaseInvoice",

            "grn",

            "warehouse",

            "items"

        ],

        schema => schema.optional()

    );
