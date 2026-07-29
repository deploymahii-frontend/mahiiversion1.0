import Joi from "joi";

export const createCategorySchema = Joi.object({

    name: Joi.string()
        .min(2)
        .max(100)
        .required(),

    code: Joi.string()
        .uppercase()
        .required(),

    description: Joi.string()
        .allow("")
        .max(500),

    image: Joi.string()
        .allow(""),

    parent: Joi.string()
        .allow(null, ""),

    sortOrder: Joi.number()
        .default(0),

    isActive: Joi.boolean()

});

export const updateCategorySchema =
    createCategorySchema.fork(

        ["name", "code"],

        schema => schema.optional()

    );
