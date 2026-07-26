import GRN from "./grn.model.js";

class GRNRepository {

    async create(data) {

        return GRN.create(data);

    }

    async update(id, data) {

        return GRN.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async findById(id) {

        return GRN.findById(id)

            .populate("purchaseOrder")

            .populate("supplier")

            .populate("warehouse")

            .populate("receivedBy")

            .populate("items.product");

    }

    async findByNumber(grnNumber) {

        return GRN.findOne({

            grnNumber

        });

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [grns, total] = await Promise.all([

            GRN.find(filter)

                .populate("supplier")

                .populate("purchaseOrder")

                .skip(skip)

                .limit(limit)

                .sort({

                    createdAt: -1

                }),

            GRN.countDocuments(filter)

        ]);

        return {

            grns,

            total,

            page,

            limit,

            totalPages:
                Math.ceil(total / limit)

        };

    }

}

export default new GRNRepository();
