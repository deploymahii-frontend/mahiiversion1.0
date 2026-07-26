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

export const createQuotationSchema = Joi.object({

    quotationNumber: Joi.string().required(),

    customer: Joi.string().required(),

    quotationDate: Joi.date(),

    validUntil: Joi.date().required(),

    notes: Joi.string().allow(""),

    items: Joi.array()

        .items(itemSchema)

        .min(1)

        .required()

});

export const updateQuotationSchema =
    createQuotationSchema.fork(

        [

            "quotationNumber",

            "customer",

            "validUntil",

            "items"

        ],

        schema => schema.optional()

    );
