import Delivery from "./delivery.model.js";

class DeliveryRepository {

    async create(data) {

        return Delivery.create(data);

    }

    async update(id, data) {

        return Delivery.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async delete(id) {

        return Delivery.findByIdAndDelete(id);

    }

    async findById(id) {

        return Delivery.findById(id)

            .populate("salesOrder")

            .populate("customer")

            .populate("warehouse")

            .populate("items.product");

    }

    async findByNumber(number) {

        return Delivery.findOne({

            deliveryNumber: number

        });

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [deliveries, total] =
            await Promise.all([

                Delivery.find(filter)

                    .populate("customer")

                    .populate("salesOrder")

                    .sort({

                        createdAt: -1

                    })

                    .skip(skip)

                    .limit(limit),

                Delivery.countDocuments(filter)

            ]);

        return {

            deliveries,

            total,

            page,

            limit,

            totalPages:
                Math.ceil(total / limit)

        };

    }

}

export default new DeliveryRepository();
