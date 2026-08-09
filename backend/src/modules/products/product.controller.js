import * as controllerHelper from "../../utils/api-response.js";
import * as service from "./product.service.js";
import shopOwnerService from "../shopOwner/shopOwner.service.js";

function getUserRole(req) {
    return String(req.user?.role?.name || req.user?.role || "").toUpperCase();
}

export async function create(req, res, next) {
    try {
        const product = await shopOwnerService.createProduct(req.user._id, req.body);

        return res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
}

export async function list(req, res, next) {
    try {
        const shopId = req.params.shopId;
        let products;

        if (shopId) {
            products = await service.getShopProducts(shopId);
        } else if (getUserRole(req) === "SHOP_OWNER") {
            products = await shopOwnerService.getProducts(req.user._id);
        } else {
            products = await service.getAllProducts();
        }

        return res.json({
            success: true,
            data: products
        });
    } catch (error) {
        next(error);
    }
}

export async function getOne(req, res, next) {
    try {
        const product = await service.getProduct(req.params.id);

        return res.json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
}

export async function update(req, res, next) {
    try {
        const product = await shopOwnerService.updateProduct(req.user._id, req.params.id, req.body);

        return res.json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
}

export async function updateStock(req, res, next) {
    try {
        const { stock } = req.body;
        const product = await shopOwnerService.updateStock(req.user._id, req.params.id, stock);

        return res.json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
}

export async function toggleAvailability(req, res, next) {
    try {
        const product = await service.getProduct(req.params.id);
        const updated = await shopOwnerService.toggleAvailability(
            req.user._id,
            req.params.id,
            !product?.available
        );

        return res.json({
            success: true,
            data: updated
        });
    } catch (error) {
        next(error);
    }
}

export async function remove(req, res, next) {
    try {
        await shopOwnerService.updateProduct(req.user._id, req.params.id, { available: false });

        return res.json({
            success: true,
            message: "Product removed successfully"
        });
    } catch (error) {
        next(error);
    }
}
