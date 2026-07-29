import Customer from "./customer.model.js";

class CustomerRepository {

    async create(data) {

        return Customer.create(data);

    }

    async update(id, data) {

        return Customer.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async delete(id) {

        return Customer.findByIdAndDelete(id);

    }

    async findById(id) {

        return Customer.findById(id);

    }

    async findByCode(code) {

        return Customer.findOne({

            customerCode: code

        });

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [customers, total] = await Promise.all([

            Customer.find(filter)

                .sort({

                    createdAt: -1

                })

                .skip(skip)

                .limit(limit),

            Customer.countDocuments(filter)

        ]);

        return {

            customers,

            total,

            page,

            limit,

            totalPages:
                Math.ceil(total / limit)

        };

    }

}

export default new CustomerRepository();
