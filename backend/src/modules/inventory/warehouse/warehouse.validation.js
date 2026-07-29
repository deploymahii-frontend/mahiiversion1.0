import Joi from "joi";

/*
|--------------------------------------------------------------------------
| Create Warehouse
|--------------------------------------------------------------------------
*/

export const createWarehouseSchema = Joi.object({

    code: Joi.string()
        .trim()
        .uppercase()
        .min(2)
        .max(20)
        .required(),

    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required(),

    description: Joi.string()
        .allow("")
        .max(500),

    address: Joi.object({

        line1: Joi.string().allow(""),

        line2: Joi.string().allow(""),

        city: Joi.string().allow(""),

        state: Joi.string().allow(""),

        country: Joi.string().allow(""),

        postalCode: Joi.string().allow("")

    }),

    manager: Joi.string(),

    contactNumber: Joi.string(),

    email: Joi.string()
        .email(),

    isActive: Joi.boolean()

});

/*
|--------------------------------------------------------------------------
| Update Warehouse
|--------------------------------------------------------------------------
*/

export const updateWarehouseSchema =
    createWarehouseSchema.fork(

        ["code", "name"],

        schema => schema.optional()

    );

/*
|--------------------------------------------------------------------------
| Search Warehouse
|--------------------------------------------------------------------------
*/

export const warehouseSearchSchema = Joi.object({

    search: Joi.string(),

    page: Joi.number()
        .min(1)
        .default(1),

    limit: Joi.number()
        .min(1)
        .max(100)
        .default(20)

});

/*
|--------------------------------------------------------------------------
| Warehouse Report
|--------------------------------------------------------------------------
*/

export const warehouseReportSchema = Joi.object({

    from: Joi.date(),

    to: Joi.date(),

    warehouse: Joi.string()

});
