import Joi from "joi";

const allocationSchema = Joi.object({

    invoice: Joi.string().required(),

    invoiceNumber: Joi.string().required(),

    allocatedAmount: Joi.number()

        .min(0)

        .required()

});

export const createCustomerPaymentSchema = Joi.object({

    paymentNumber: Joi.string().required(),

    customer: Joi.string().required(),

    paymentDate: Joi.date(),

    paymentMethod: Joi.string().required(),

    referenceNumber: Joi.string().allow(""),

    amount: Joi.number()

        .positive()

        .required(),

    notes: Joi.string().allow(""),

    allocations: Joi.array()

        .items(allocationSchema)

});

export const updateCustomerPaymentSchema =
    createCustomerPaymentSchema.fork(

        [

            "paymentNumber",

            "customer",

            "paymentMethod",

            "amount"

        ],

        schema => schema.optional()

    );
