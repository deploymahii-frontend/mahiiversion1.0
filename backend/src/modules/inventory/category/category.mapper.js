export function toCategoryResponse(category) {

    if (!category) {

        return null;

    }

    return {

        id: category._id,

        name: category.name,

        slug: category.slug,

        code: category.code,

        description: category.description,

        image: category.image,

        parent: category.parent,

        level: category.level,

        sortOrder: category.sortOrder,

        isActive: category.isActive,

        createdAt: category.createdAt,

        updatedAt: category.updatedAt

    };

}
