import Product from "./product.model.js";

class ProductRepository {

    async create(data) {
        return Product.create(data);
    }

    async update(id, data) {
        return Product.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async delete(id) {
        return Product.findByIdAndDelete(id);
    }

    async findById(id) {
        return Product.findById(id)
            .populate("category")
            .populate("warehouse")
            .populate("supplier");
    }

    async findBySKU(sku) {
        return Product.findOne({ sku });
    }

    async findBySlug(slug) {
        return Product.findOne({ slug });
    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [products, total] = await Promise.all([

            Product.find(filter)
                .populate("category")
                .populate("warehouse")
                .populate("supplier")
                .skip(skip)
                .limit(limit)
                .sort({
                    createdAt: -1
                }),

            Product.countDocuments(filter)

        ]);

        return {

            products,

            total,

            page,

            limit,

            totalPages:
                Math.ceil(total / limit)

        };

    }

}

export default new ProductRepository();
