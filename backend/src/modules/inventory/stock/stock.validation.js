import Joi from "joi";

export const createStockSchema = Joi.object({

    product: Joi.string().required(),

    warehouse: Joi.string().required(),

    availableQuantity: Joi.number().default(0),

    reservedQuantity: Joi.number().default(0),

    damagedQuantity: Joi.number().default(0),

    inTransitQuantity: Joi.number().default(0),

    reorderLevel: Joi.number().default(0),

    maximumLevel: Joi.number().default(0),

    lastPurchasePrice: Joi.number().default(0),

    averageCost: Joi.number().default(0)

});

export const stockMovementSchema = Joi.object({

    product: Joi.string().required(),

    warehouse: Joi.string().required(),

    quantity: Joi.number().positive().required(),

    referenceNumber: Joi.string().allow(""),

    remarks: Joi.string().allow("")

});
