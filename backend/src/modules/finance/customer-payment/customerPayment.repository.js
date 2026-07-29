import CustomerPayment from "./customerPayment.model.js";

class CustomerPaymentRepository {

    async create(data) {

        return CustomerPayment.create(data);

    }

    async update(id, data) {

        return CustomerPayment.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async delete(id) {

        return CustomerPayment.findByIdAndDelete(id);

    }

    async findById(id) {

        return CustomerPayment.findById(id)

            .populate("customer")

            .populate("allocations.invoice");

    }

    async findByNumber(number) {

        return CustomerPayment.findOne({

            paymentNumber: number

        });

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [payments, total] =
            await Promise.all([

                CustomerPayment.find(filter)

                    .populate("customer")

                    .sort({

                        createdAt: -1

                    })

                    .skip(skip)

                    .limit(limit),

                CustomerPayment.countDocuments(filter)

            ]);

        return {

            payments,

            total,

            page,

            limit,

            totalPages:
                Math.ceil(total / limit)

        };

    }

}

export default new CustomerPaymentRepository();
