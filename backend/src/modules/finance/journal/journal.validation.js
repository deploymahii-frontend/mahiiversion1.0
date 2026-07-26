import Joi from "joi";

export const createJournalSchema = Joi.object({

    journalNumber: Joi.string().required(),

    journalDate: Joi.date(),

    referenceType: Joi.string().required(),

    referenceId: Joi.string().allow(null),

    description: Joi.string().allow(""),

    lines: Joi.array()

        .items(

            Joi.object({

                account: Joi.string().required(),

                debit: Joi.number().min(0).default(0),

                credit: Joi.number().min(0).default(0),

                narration: Joi.string().allow("")

            })

        )

        .min(2)

        .required()

});

export const updateJournalSchema =
    createJournalSchema.fork(

        [

            "journalNumber",

            "referenceType",

            "lines"

        ],

        schema => schema.optional()

    );
