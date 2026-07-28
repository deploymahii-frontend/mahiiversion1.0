import * as controllerHelper from "../../utils/api-response.js";
import * as service from "./product.service.js";

export async function create(req, res, next) {
    try {
        const product = await service.createProduct(req.body);

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
        const shopId = req.params.shopId || req.user?.shopId;
        const products = shopId 
            ? await service.getShopProducts(shopId)
            : await service.getAllProducts();

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
        const product = await service.updateProduct(req.params.id, req.body);

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
        const product = await service.updateProduct(req.params.id, { stock });

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
        const updated = await service.updateProduct(req.params.id, { available: !product?.available });

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
        await service.updateProduct(req.params.id, { available: false });

        return res.json({
            success: true,
            message: "Product removed successfully"
        });
    } catch (error) {
        next(error);
    }
}
