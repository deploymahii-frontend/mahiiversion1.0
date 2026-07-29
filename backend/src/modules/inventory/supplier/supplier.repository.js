import Supplier from "./supplier.model.js";

class SupplierRepository {

    async create(data) {

        return Supplier.create(data);

    }

    async update(id, data) {

        return Supplier.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async delete(id) {

        return Supplier.findByIdAndDelete(id);

    }

    async findById(id) {

        return Supplier.findById(id);

    }

    async findByCode(code) {

        return Supplier.findOne({

            supplierCode: code

        });

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [suppliers, total] = await Promise.all([

            Supplier.find(filter)

                .skip(skip)

                .limit(limit)

                .sort({

                    createdAt: -1

                }),

            Supplier.countDocuments(filter)

        ]);

        return {

            suppliers,

            total,

            page,

            limit,

            totalPages:
                Math.ceil(total / limit)

        };

    }

}

export default new SupplierRepository();
