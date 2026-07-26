import Joi from "joi";

export const createCompanySchema = Joi.object({
    name: Joi.string().trim().required(),
    code: Joi.string().trim().required(),
    email: Joi.string().email().trim().optional().allow(""),
    phone: Joi.string().trim().optional().allow(""),
    website: Joi.string().uri().trim().optional().allow(""),
    gstNumber: Joi.string().trim().optional().allow(""),
    panNumber: Joi.string().trim().optional().allow(""),
    cinNumber: Joi.string().trim().optional().allow(""),
    address: Joi.object({
        line1: Joi.string().trim().optional().allow(""),
        line2: Joi.string().trim().optional().allow(""),
        city: Joi.string().trim().optional().allow(""),
        state: Joi.string().trim().optional().allow(""),
        country: Joi.string().trim().optional().allow(""),
        pincode: Joi.string().trim().optional().allow("")
    }).optional(),
    logo: Joi.string().trim().optional().allow(""),
    status: Joi.string().valid("ACTIVE", "INACTIVE").optional()
});

export const updateCompanySchema = createCompanySchema.fork([
    "name",
    "code"
], (schema) => schema.optional());
