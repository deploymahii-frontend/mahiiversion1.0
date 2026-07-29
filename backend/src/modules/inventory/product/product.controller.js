import * as productService from "./product.service.js";

/*
|--------------------------------------------------------------------------
| Create Product
|--------------------------------------------------------------------------
*/

export async function createProduct(req, res, next) {

    try {

        const product =
            await productService.createProduct(req.body);

        return res.status(201).json({

            success: true,

            message: "Product created successfully.",

            data: product

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Update Product
|--------------------------------------------------------------------------
*/

export async function updateProduct(req, res, next) {

    try {

        const product =
            await productService.updateProduct(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Product updated successfully.",

            data: product

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Delete Product
|--------------------------------------------------------------------------
*/

export async function deleteProduct(req, res, next) {

    try {

        await productService.deleteProduct(req.params.id);

        return res.status(200).json({

            success: true,

            message: "Product deleted successfully."

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Product Details
|--------------------------------------------------------------------------
*/

export async function getProduct(req, res, next) {

    try {

        const product =
            await productService.getProduct(req.params.id);

        return res.status(200).json({

            success: true,

            data: product

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Product List
|--------------------------------------------------------------------------
*/

export async function getProducts(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const products =
            await productService.getProducts(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: products

        });

    } catch (error) {

        next(error);

    }

}
