import Joi from "joi";
import {
  SHOP_CATEGORIES,
  DAYS_OF_WEEK,
  SHOP_DEFAULTS,
} from "./shop.constants.js";

const businessHourSchema = Joi.object({
  day: Joi.string()
    .valid(...DAYS_OF_WEEK)
    .required(),

  open: Joi.string().allow("").default(""),

  close: Joi.string().allow("").default(""),

  closed: Joi.boolean().default(false),
});

const addressSchema = Joi.object({
  addressLine: Joi.string().trim().max(200),

  area: Joi.string().trim().max(100),

  city: Joi.string().trim().max(100).required(),

  state: Joi.string().trim().max(100).required(),

  country: Joi.string().trim().default("India"),

  pincode: Joi.string().trim().max(10),
});

export const createShopSchema = Joi.object({
  name: Joi.string().trim().min(2).max(120).required(),

  description: Joi.string()
    .trim()
    .max(SHOP_DEFAULTS.MAX_DESCRIPTION_LENGTH)
    .allow(""),

  category: Joi.string()
    .valid(...SHOP_CATEGORIES)
    .required(),

  tagline: Joi.string().trim().max(160).allow(""),

  tags: Joi.array().items(Joi.string().trim()).default([]),

  phone: Joi.string().trim().required(),

  email: Joi.string().email().allow(""),

  website: Joi.string().uri().allow(""),

  socialLinks: Joi.object({
    whatsapp: Joi.string().uri().allow(""),
    instagram: Joi.string().uri().allow(""),
  }).default({}),

  address: addressSchema.required(),

  location: Joi.object({
    latitude: Joi.number().min(-90).max(90).required(),

    longitude: Joi.number().min(-180).max(180).required(),
  }),

  businessHours: Joi.array()
    .items(businessHourSchema)
    .default([]),

  deliveryAvailable: Joi.boolean().default(false),

  pickupAvailable: Joi.boolean().default(true),
});

export const updateShopSchema = createShopSchema.fork(
  ["name", "category", "phone", "address"],
  (schema) => schema.optional()
);

export const updateLocationSchema = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),

  longitude: Joi.number().min(-180).max(180).required(),
});

export const updateBusinessHoursSchema = Joi.object({
  businessHours: Joi.array()
    .items(businessHourSchema)
    .required(),
});

export const shopSearchSchema = Joi.object({
  search: Joi.string().allow(""),

  category: Joi.string()
    .valid(...SHOP_CATEGORIES)
    .allow(""),

  city: Joi.string().allow(""),

  page: Joi.number().integer().min(1).default(1),

  limit: Joi.number().integer().min(1).max(100).default(10),
});
