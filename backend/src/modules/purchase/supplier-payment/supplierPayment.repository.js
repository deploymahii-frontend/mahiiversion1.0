import SupplierPayment from "./supplierPayment.model.js";

class SupplierPaymentRepository {

    async create(data) {

        return SupplierPayment.create(data);

    }

    async update(id, data) {

        return SupplierPayment.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async delete(id) {

        return SupplierPayment.findByIdAndDelete(id);

    }

    async findById(id) {

        return SupplierPayment.findById(id)

            .populate("supplier")

            .populate("bankAccount")

            .populate("createdBy")

            .populate("allocations.purchaseInvoice");

    }

    async findByPaymentNumber(paymentNumber) {

        return SupplierPayment.findOne({

            paymentNumber

        });

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [payments, total] = await Promise.all([

            SupplierPayment.find(filter)

                .populate("supplier")

                .skip(skip)

                .limit(limit)

                .sort({

                    createdAt: -1

                }),

            SupplierPayment.countDocuments(filter)

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

export default new SupplierPaymentRepository();
