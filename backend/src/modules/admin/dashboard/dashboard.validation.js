import Joi from "joi";

const revenueValidation = Joi.object({
  period: Joi.string().valid("daily", "weekly", "monthly", "yearly").default("monthly")
});

const listValidation = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(5)
});

export const validateRevenueQuery = (data) => {
  return revenueValidation.validate(data);
};

export const validateListQuery = (data) => {
  return listValidation.validate(data);
};