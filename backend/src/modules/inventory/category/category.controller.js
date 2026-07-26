import * as categoryService from "./category.service.js";

/*
|--------------------------------------------------------------------------
| Create Category
|--------------------------------------------------------------------------
*/

export async function createCategory(req, res, next) {

    try {

        const category =
            await categoryService.createCategory(req.body);

        return res.status(201).json({

            success: true,

            message: "Category created successfully.",

            data: category

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Update Category
|--------------------------------------------------------------------------
*/

export async function updateCategory(req, res, next) {

    try {

        const category =
            await categoryService.updateCategory(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Category updated successfully.",

            data: category

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Delete Category
|--------------------------------------------------------------------------
*/

export async function deleteCategory(req, res, next) {

    try {

        await categoryService.deleteCategory(req.params.id);

        return res.status(200).json({

            success: true,

            message: "Category deleted successfully."

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Category Details
|--------------------------------------------------------------------------
*/

export async function getCategory(req, res, next) {

    try {

        const category =
            await categoryService.getCategory(req.params.id);

        return res.status(200).json({

            success: true,

            data: category

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Category List
|--------------------------------------------------------------------------
*/

export async function getCategories(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const categories =
            await categoryService.getCategories(
                page,
                limit
            );

        return res.status(200).json({

            success: true,

            data: categories

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Category Tree
|--------------------------------------------------------------------------
*/

export async function getCategoryTree(req, res, next) {

    try {

        const tree =
            await categoryService.getCategoryTree();

        return res.status(200).json({

            success: true,

            data: tree

        });

    } catch (error) {

        next(error);

    }

}
