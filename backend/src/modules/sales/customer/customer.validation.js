import Joi from "joi";

export const createCustomerSchema = Joi.object({

    customerCode: Joi.string().required(),

    name: Joi.string().required(),

    companyName: Joi.string().allow(""),

    email: Joi.string().email().allow(""),

    phone: Joi.string().required(),

    gstNumber: Joi.string().allow(""),

    panNumber: Joi.string().allow(""),

    creditLimit: Joi.number().min(0),

    outstandingAmount: Joi.number().min(0)

});

export const updateCustomerSchema =
    createCustomerSchema.fork(

        [

            "customerCode",

            "name",

            "phone"

        ],

        schema => schema.optional()

    );
