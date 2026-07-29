import { z } from "zod";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_STATUS,
  FOOD_TYPE,
} from "./product.constants.js";

export const createProductSchema = z.object({
  body: z.object({
    shop: z.string().min(1),

    name: z.string().min(2).max(120),

    description: z.string().optional(),

    category: z.enum(PRODUCT_CATEGORIES),

    foodType: z.enum(Object.values(FOOD_TYPE)),

    price: z.number().nonnegative(),

    discountedPrice: z.number().nonnegative().optional(),

    images: z.array(z.string()).optional(),

    preparationTime: z.number().min(1).optional(),

    tags: z.array(z.string()).optional(),

    searchKeywords: z.array(z.string()).optional(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(120).optional(),

    description: z.string().optional(),

    category: z.enum(PRODUCT_CATEGORIES).optional(),

    foodType: z.enum(Object.values(FOOD_TYPE)).optional(),

    price: z.number().nonnegative().optional(),

    discountedPrice: z.number().nonnegative().optional(),

    images: z.array(z.string()).optional(),

    isAvailable: z.boolean().optional(),

    preparationTime: z.number().min(1).optional(),

    tags: z.array(z.string()).optional(),

    searchKeywords: z.array(z.string()).optional(),

    status: z.enum(Object.values(PRODUCT_STATUS)).optional(),
  }),
});
