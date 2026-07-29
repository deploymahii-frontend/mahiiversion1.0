import Joi from "joi";

export const createProductSchema = Joi.object({

    sku: Joi.string()
        .uppercase()
        .required(),

    barcode: Joi.string()
        .allow(""),

    name: Joi.string()
        .min(2)
        .max(200)
        .required(),

    description: Joi.string()
        .allow(""),

    category: Joi.string()
        .required(),

    warehouse: Joi.string()
        .required(),

    supplier: Joi.string()
        .allow("", null),

    brand: Joi.string()
        .allow(""),

    unit: Joi.string()
        .default("PCS"),

    purchasePrice: Joi.number()
        .min(0)
        .default(0),

    sellingPrice: Joi.number()
        .min(0)
        .required(),

    gst: Joi.number()
        .min(0)
        .max(100)
        .default(0),

    currentStock: Joi.number()
        .min(0)
        .default(0),

    minimumStock: Joi.number()
        .min(0)
        .default(0),

    maximumStock: Joi.number()
        .min(0)
        .default(0),

    images: Joi.array()
        .items(Joi.string()),

    isActive: Joi.boolean()

});

export const updateProductSchema =
    createProductSchema.fork(

        [

            "sku",

            "name",

            "category",

            "warehouse",

            "sellingPrice"

        ],

        schema => schema.optional()

    );
