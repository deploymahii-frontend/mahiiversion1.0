import Joi from "joi";

const itemSchema = Joi.object({

    product: Joi.string().required(),

    productCode: Joi.string().required(),

    productName: Joi.string().required(),

    quantity: Joi.number().min(1).required(),

    unitPrice: Joi.number().min(0).required(),

    discount: Joi.number().min(0).default(0),

    tax: Joi.number().min(0).default(0)

});

export const createSalesOrderSchema = Joi.object({

    salesOrderNumber: Joi.string().required(),

    quotation: Joi.string().allow(null),

    customer: Joi.string().required(),

    expectedDeliveryDate: Joi.date(),

    notes: Joi.string().allow(""),

    items: Joi.array()

        .items(itemSchema)

        .min(1)

        .required()

});

export const updateSalesOrderSchema =
    createSalesOrderSchema.fork(

        [

            "salesOrderNumber",

            "customer",

            "items"

        ],

        schema => schema.optional()

    );
