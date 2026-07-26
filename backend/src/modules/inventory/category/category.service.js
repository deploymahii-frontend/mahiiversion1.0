import categoryRepository from "./category.repository.js";
import slugify from "slugify";

/*
|--------------------------------------------------------------------------
| Create Category
|--------------------------------------------------------------------------
*/

export async function createCategory(data) {

    const slug = slugify(data.name, {
        lower: true,
        strict: true
    });

    const slugExists =
        await categoryRepository.findBySlug(slug);

    if (slugExists) {
        throw new Error("Category already exists.");
    }

    const codeExists =
        await categoryRepository.findByCode(data.code);

    if (codeExists) {
        throw new Error("Category code already exists.");
    }

    if (data.parent) {

        const parent =
            await categoryRepository.findById(data.parent);

        if (!parent) {
            throw new Error("Parent category not found.");
        }

        data.level = parent.level + 1;

    } else {

        data.level = 1;

    }

    return categoryRepository.create({

        ...data,

        slug

    });

}

/*
|--------------------------------------------------------------------------
| Update Category
|--------------------------------------------------------------------------
*/

export async function updateCategory(id, data) {

    const category =
        await categoryRepository.findById(id);

    if (!category) {
        throw new Error("Category not found.");
    }

    if (data.name) {

        data.slug = slugify(data.name, {
            lower: true,
            strict: true
        });

    }

    return categoryRepository.update(id, data);

}

/*
|--------------------------------------------------------------------------
| Delete Category
|--------------------------------------------------------------------------
*/

export async function deleteCategory(id) {

    const category =
        await categoryRepository.findById(id);

    if (!category) {
        throw new Error("Category not found.");
    }

    return categoryRepository.delete(id);

}

/*
|--------------------------------------------------------------------------
| Get Category
|--------------------------------------------------------------------------
*/

export async function getCategory(id) {

    return categoryRepository.findById(id);

}

/*
|--------------------------------------------------------------------------
| Category List
|--------------------------------------------------------------------------
*/

export async function getCategories(page, limit) {

    return categoryRepository.paginate(
        {},
        page,
        limit
    );

}

/*
|--------------------------------------------------------------------------
| Category Tree
|--------------------------------------------------------------------------
*/

export async function getCategoryTree() {

    return categoryRepository.findAll();

}
