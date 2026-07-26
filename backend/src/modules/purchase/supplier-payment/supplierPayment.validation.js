import Joi from "joi";

export const createSupplierPaymentSchema = Joi.object({

    paymentNumber: Joi.string().required(),

    supplier: Joi.string().required(),

    paymentDate: Joi.date(),

    paymentMethod: Joi.string().required(),

    referenceNumber: Joi.string().allow(""),

    bankAccount: Joi.string().allow(null),

    totalAmount: Joi.number().positive().required(),

    remarks: Joi.string().allow(""),

    allocations: Joi.array()

        .items(

            Joi.object({

                purchaseInvoice: Joi.string().required(),

                allocatedAmount: Joi.number()

                    .positive()

                    .required()

            })

        )

        .min(1)

        .required()

});

export const updateSupplierPaymentSchema =
    createSupplierPaymentSchema.fork(

        [

            "paymentNumber",

            "supplier",

            "allocations"

        ],

        schema => schema.optional()

    );
