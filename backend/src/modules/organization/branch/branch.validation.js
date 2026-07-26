import Joi from "joi";

export const createBranchSchema = Joi.object({
    company: Joi.string().required(),
    name: Joi.string().trim().required(),
    code: Joi.string().trim().required(),
    email: Joi.string().email().trim().optional().allow(""),
    phone: Joi.string().trim().optional().allow(""),
    manager: Joi.string().trim().optional().allow(""),
    address: Joi.object({
        line1: Joi.string().trim().optional().allow(""),
        line2: Joi.string().trim().optional().allow(""),
        city: Joi.string().trim().optional().allow(""),
        state: Joi.string().trim().optional().allow(""),
        country: Joi.string().trim().optional().allow(""),
        pincode: Joi.string().trim().optional().allow("")
    }).optional(),
    location: Joi.object({
        latitude: Joi.number().optional(),
        longitude: Joi.number().optional()
    }).optional(),
    status: Joi.string().valid("ACTIVE", "INACTIVE").optional()
});

export const updateBranchSchema = createBranchSchema.fork([
    "company",
    "name",
    "code"
], (schema) => schema.optional());
