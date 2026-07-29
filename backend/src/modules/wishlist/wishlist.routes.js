import { Router } from "express";
import * as wishlistController from "./wishlist.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/", wishlistController.getWishlist);
router.post("/:shopId", wishlistController.addWishlistItem);
router.delete("/:shopId", wishlistController.removeWishlistItem);

export default router;
