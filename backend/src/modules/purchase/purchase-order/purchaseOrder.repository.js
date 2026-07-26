import PurchaseOrder from "./purchaseOrder.model.js";

class PurchaseOrderRepository {

    async create(data) {

        return PurchaseOrder.create(data);

    }

    async update(id, data) {

        return PurchaseOrder.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async delete(id) {

        return PurchaseOrder.findByIdAndDelete(id);

    }

    async findById(id) {

        return PurchaseOrder.findById(id)

            .populate("supplier")

            .populate("warehouse")

            .populate("items.product")

            .populate("createdBy");

    }

    async findByNumber(poNumber) {

        return PurchaseOrder.findOne({

            poNumber

        });

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [purchaseOrders, total] = await Promise.all([

            PurchaseOrder.find(filter)

                .populate("supplier")

                .populate("warehouse")

                .skip(skip)

                .limit(limit)

                .sort({

                    createdAt: -1

                }),

            PurchaseOrder.countDocuments(filter)

        ]);

        return {

            purchaseOrders,

            total,

            page,

            limit,

            totalPages:
                Math.ceil(total / limit)

        };

    }

}

export default new PurchaseOrderRepository();
