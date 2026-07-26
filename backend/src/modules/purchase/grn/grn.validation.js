import Joi from "joi";

export const createGRNSchema = Joi.object({

    grnNumber: Joi.string().required(),

    purchaseOrder: Joi.string().required(),

    supplier: Joi.string().required(),

    warehouse: Joi.string().required(),

    invoiceNumber: Joi.string().allow(""),

    vehicleNumber: Joi.string().allow(""),

    remarks: Joi.string().allow(""),

    items: Joi.array()

        .items(

            Joi.object({

                product: Joi.string().required(),

                purchaseOrderItemId:
                    Joi.string().required(),

                orderedQuantity:
                    Joi.number().required(),

                receivedQuantity:
                    Joi.number().positive().required(),

                acceptedQuantity:
                    Joi.number().positive().required(),

                rejectedQuantity:
                    Joi.number().default(0),

                purchasePrice:
                    Joi.number().positive().required(),

                remarks:
                    Joi.string().allow("")

            })

        )

        .min(1)

        .required()

});
