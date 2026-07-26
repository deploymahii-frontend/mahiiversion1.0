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
        const products = await service.getProducts(req.params.shopId);

        return res.json({
            success: true,
            data: products
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
