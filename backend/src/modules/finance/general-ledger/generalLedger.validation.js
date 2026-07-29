import Joi from "joi";

export const postJournalSchema = Joi.object({

    journalId: Joi.string().required()

});
