import PurchaseReturn from "./purchaseReturn.model.js";

class PurchaseReturnRepository {

    async create(data) {

        return PurchaseReturn.create(data);

    }

    async update(id, data) {

        return PurchaseReturn.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async delete(id) {

        return PurchaseReturn.findByIdAndDelete(id);

    }

    async findById(id) {

        return PurchaseReturn.findById(id)

            .populate("supplier")

            .populate("purchaseOrder")

            .populate("purchaseInvoice")

            .populate("grn")

            .populate("warehouse")

            .populate("items.product")

            .populate("createdBy");

    }

    async findByNumber(returnNumber) {

        return PurchaseReturn.findOne({

            returnNumber

        });

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [returns, total] = await Promise.all([

            PurchaseReturn.find(filter)

                .populate("supplier")

                .populate("purchaseInvoice")

                .skip(skip)

                .limit(limit)

                .sort({

                    createdAt: -1

                }),

            PurchaseReturn.countDocuments(filter)

        ]);

        return {

            returns,

            total,

            page,

            limit,

            totalPages:
                Math.ceil(total / limit)

        };

    }

}

export default new PurchaseReturnRepository();
