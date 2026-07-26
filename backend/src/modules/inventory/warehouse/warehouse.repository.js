import Warehouse from "./warehouse.model.js";

class WarehouseRepository {

    async create(data) {

        return Warehouse.create(data);

    }

    async update(id, data) {

        return Warehouse.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async delete(id) {

        return Warehouse.findByIdAndDelete(id);

    }

    async findById(id) {

        return Warehouse.findById(id)
            .populate("manager");

    }

    async findByCode(code) {

        return Warehouse.findOne({
            code
        });

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [warehouses, total] = await Promise.all([

            Warehouse.find(filter)

                .populate("manager")

                .skip(skip)

                .limit(limit)

                .sort({
                    createdAt: -1
                }),

            Warehouse.countDocuments(filter)

        ]);

        return {

            warehouses,

            total,

            page,

            limit,

            totalPages: Math.ceil(total / limit)

        };

    }

    async statistics() {

        const total =
            await Warehouse.countDocuments();

        const active =
            await Warehouse.countDocuments({
                isActive: true
            });

        const inactive =
            await Warehouse.countDocuments({
                isActive: false
            });

        return {

            total,

            active,

            inactive

        };

    }

}

export default new WarehouseRepository();
