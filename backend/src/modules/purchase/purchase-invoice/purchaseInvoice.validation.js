import Joi from "joi";

export const createPurchaseInvoiceSchema = Joi.object({

    invoiceNumber: Joi.string().required(),

    purchaseOrder: Joi.string().required(),

    grn: Joi.string().required(),

    supplier: Joi.string().required(),

    invoiceDate: Joi.date(),

    dueDate: Joi.date(),

    discountAmount: Joi.number().default(0),

    taxAmount: Joi.number().default(0),

    remarks: Joi.string().allow(""),

    items: Joi.array().items(

        Joi.object({

            product: Joi.string().required(),

            quantity: Joi.number().positive().required(),

            unitPrice: Joi.number().positive().required(),

            taxPercentage: Joi.number().default(0),

            discountPercentage: Joi.number().default(0)

        })

    ).min(1).required()

});

export const updatePurchaseInvoiceSchema =
    createPurchaseInvoiceSchema.fork(

        [

            "invoiceNumber",

            "purchaseOrder",

            "grn",

            "supplier",

            "items"

        ],

        schema => schema.optional()

    );
