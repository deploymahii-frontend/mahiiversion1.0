import Joi from "joi";

export const createProductSchema = Joi.object({

    name: Joi.string()
        .trim()
        .min(2)
        .max(120)
        .required(),

    description: Joi.string()
        .trim()
        .max(1000)
        .allow(""),

    price: Joi.number()
        .min(0)
        .required(),

    stock: Joi.number()
        .integer()
        .min(0)
        .required(),

    categoryId: Joi.string()
        .required(),

    available: Joi.boolean()

});
