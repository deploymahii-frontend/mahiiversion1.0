import SalesOrder from "./salesOrder.model.js";

class SalesOrderRepository {

    async create(data) {

        return SalesOrder.create(data);

    }

    async update(id, data) {

        return SalesOrder.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async delete(id) {

        return SalesOrder.findByIdAndDelete(id);

    }

    async findById(id) {

        return SalesOrder.findById(id)

            .populate("customer")

            .populate("quotation")

            .populate("items.product");

    }

    async findByNumber(number) {

        return SalesOrder.findOne({

            salesOrderNumber: number

        });

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [orders, total] = await Promise.all([

            SalesOrder.find(filter)

                .populate("customer")

                .sort({

                    createdAt: -1

                })

                .skip(skip)

                .limit(limit),

            SalesOrder.countDocuments(filter)

        ]);

        return {

            orders,

            total,

            page,

            limit,

            totalPages:
                Math.ceil(total / limit)

        };

    }

}

export default new SalesOrderRepository();
