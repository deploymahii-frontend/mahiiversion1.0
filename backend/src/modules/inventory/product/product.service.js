import productRepository from "./product.repository.js";
import categoryRepository from "../category/category.repository.js";
import warehouseRepository from "../warehouse/warehouse.repository.js";
import slugify from "slugify";

/*
|--------------------------------------------------------------------------
| Create Product
|--------------------------------------------------------------------------
*/

export async function createProduct(data) {

    const skuExists =
        await productRepository.findBySKU(data.sku);

    if (skuExists) {
        throw new Error("Product SKU already exists.");
    }

    const slug = slugify(data.name, {
        lower: true,
        strict: true
    });

    const slugExists =
        await productRepository.findBySlug(slug);

    if (slugExists) {
        throw new Error("Product already exists.");
    }

    const category =
        await categoryRepository.findById(data.category);

    if (!category) {
        throw new Error("Category not found.");
    }

    const warehouse =
        await warehouseRepository.findById(data.warehouse);

    if (!warehouse) {
        throw new Error("Warehouse not found.");
    }

    return productRepository.create({

        ...data,

        slug

    });

}

/*
|--------------------------------------------------------------------------
| Update Product
|--------------------------------------------------------------------------
*/

export async function updateProduct(id, data) {

    const product =
        await productRepository.findById(id);

    if (!product) {
        throw new Error("Product not found.");
    }

    if (data.name) {

        data.slug = slugify(data.name, {
            lower: true,
            strict: true
        });

    }

    return productRepository.update(id, data);

}

/*
|--------------------------------------------------------------------------
| Delete Product
|--------------------------------------------------------------------------
*/

export async function deleteProduct(id) {

    const product =
        await productRepository.findById(id);

    if (!product) {
        throw new Error("Product not found.");
    }

    return productRepository.delete(id);

}

/*
|--------------------------------------------------------------------------
| Product Details
|--------------------------------------------------------------------------
*/

export async function getProduct(id) {

    return productRepository.findById(id);

}

/*
|--------------------------------------------------------------------------
| Product List
|--------------------------------------------------------------------------
*/

export async function getProducts(page, limit) {

    return productRepository.paginate(
        {},
        page,
        limit
    );

}
