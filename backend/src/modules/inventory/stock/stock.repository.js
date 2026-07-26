import Stock from "./stock.model.js";

class StockRepository {

    async create(data) {

        return Stock.create(data);

    }

    async update(id, data) {

        return Stock.findByIdAndUpdate(

            id,

            data,

            {
                new: true,
                runValidators: true
            }

        );

    }

    async findById(id) {

        return Stock.findById(id)
            .populate("product")
            .populate("warehouse");

    }

    async findOne(product, warehouse) {

        return Stock.findOne({

            product,

            warehouse

        });

    }

    async delete(id) {

        return Stock.findByIdAndDelete(id);

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [stocks, total] = await Promise.all([

            Stock.find(filter)

                .populate("product")

                .populate("warehouse")

                .skip(skip)

                .limit(limit)

                .sort({
                    createdAt: -1
                }),

            Stock.countDocuments(filter)

        ]);

        return {

            stocks,

            total,

            page,

            limit,

            totalPages:
                Math.ceil(total / limit)

        };

    }

}

export default new StockRepository();
