import Joi from "joi";

export const createSupplierSchema = Joi.object({

    supplierCode: Joi.string()
        .uppercase()
        .required(),

    companyName: Joi.string()
        .min(2)
        .max(200)
        .required(),

    contactPerson: Joi.string()
        .min(2)
        .required(),

    email: Joi.string()
        .email(),

    phone: Joi.string()
        .required(),

    gstNumber: Joi.string()
        .allow(""),

    panNumber: Joi.string()
        .allow(""),

    address: Joi.object({

        line1: Joi.string().allow(""),

        line2: Joi.string().allow(""),

        city: Joi.string().allow(""),

        state: Joi.string().allow(""),

        country: Joi.string().allow(""),

        postalCode: Joi.string().allow("")

    }),

    paymentTerms: Joi.number()
        .default(30),

    creditLimit: Joi.number()
        .default(0),

    notes: Joi.string()
        .allow(""),

    isActive: Joi.boolean()

});

export const updateSupplierSchema =
    createSupplierSchema.fork(

        [

            "supplierCode",

            "companyName",

            "contactPerson",

            "phone"

        ],

        schema => schema.optional()

    );
