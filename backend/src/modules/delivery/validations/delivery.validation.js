import Joi from "joi";

export const deliverySignupSchema = Joi.object({
  vehicleType: Joi.string()
    .valid("BIKE", "SCOOTER", "BICYCLE")
    .required(),
  vehicleNumber: Joi.string().required(),
  drivingLicense: Joi.string().allow("", null),
  aadhaarNumber: Joi.string().allow("", null),
});

export const updateStatusSchema = Joi.object({
  online: Joi.boolean().required(),
});

export const updateLocationSchema = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  heading: Joi.number().optional(),
  speed: Joi.number().optional(),
  accuracy: Joi.number().optional(),
});
