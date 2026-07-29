import Joi from "joi";

export const createAccountSchema = Joi.object({

    code: Joi.string().required(),

    name: Joi.string().required(),

    type: Joi.string()

        .valid(

            "ASSET",

            "LIABILITY",

            "EQUITY",

            "REVENUE",

            "EXPENSE"

        )

        .required(),

    parent: Joi.string().allow(null),

    isGroup: Joi.boolean().default(false),

    active: Joi.boolean().default(true)

});

export const updateAccountSchema = createAccountSchema.fork(

    [

        "code",

        "name",

        "type"

    ],

    schema => schema.optional()

);
