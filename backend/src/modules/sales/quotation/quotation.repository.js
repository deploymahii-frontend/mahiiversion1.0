import Quotation from "./quotation.model.js";

class QuotationRepository {

    async create(data) {

        return Quotation.create(data);

    }

    async update(id, data) {

        return Quotation.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async delete(id) {

        return Quotation.findByIdAndDelete(id);

    }

    async findById(id) {

        return Quotation.findById(id)

            .populate("customer")

            .populate("items.product");

    }

    async findByNumber(number) {

        return Quotation.findOne({

            quotationNumber: number

        });

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [quotations, total] =
            await Promise.all([

                Quotation.find(filter)

                    .populate("customer")

                    .sort({

                        createdAt: -1

                    })

                    .skip(skip)

                    .limit(limit),

                Quotation.countDocuments(filter)

            ]);

        return {

            quotations,

            total,

            page,

            limit,

            totalPages:
                Math.ceil(total / limit)

        };

    }

}

export default new QuotationRepository();
