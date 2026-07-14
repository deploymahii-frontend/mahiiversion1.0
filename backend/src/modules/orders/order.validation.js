import Joi from "joi";
import { ORDER_STATUS, PAYMENT_METHOD } from "./order.constants.js";

export const createOrderSchema = Joi.object({
  deliveryType: Joi.string().valid("PICKUP", "SHOP_DELIVERY", "VISIT_SHOP").required(),

  paymentMethod: Joi.string()
    .valid(...Object.values(PAYMENT_METHOD))
    .required(),

  notes: Joi.string()
    .max(500)
    .allow("")
    .optional(),

  deliveryAddress: Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    mobile: Joi.string().min(10).max(15).required(),
    addressLine: Joi.string().required(),
    area: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
    landmark: Joi.string().allow("").optional(),
  }).when("deliveryType", {
    is: "SHOP_DELIVERY",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

export const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(ORDER_STATUS))
    .required(),
});
