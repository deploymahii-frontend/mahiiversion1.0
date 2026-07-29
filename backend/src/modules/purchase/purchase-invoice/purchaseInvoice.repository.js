import PurchaseInvoice from "./purchaseInvoice.model.js";

class PurchaseInvoiceRepository {

    async create(data) {

        return PurchaseInvoice.create(data);

    }

    async update(id, data) {

        return PurchaseInvoice.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async delete(id) {

        return PurchaseInvoice.findByIdAndDelete(id);

    }

    async findById(id) {

        return PurchaseInvoice.findById(id)

            .populate("purchaseOrder")

            .populate("grn")

            .populate("supplier")

            .populate("items.product")

            .populate("createdBy");

    }

    async findByInvoiceNumber(invoiceNumber) {

        return PurchaseInvoice.findOne({

            invoiceNumber

        });

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [purchaseInvoices, total] = await Promise.all([

            PurchaseInvoice.find(filter)

                .populate("supplier")

                .populate("purchaseOrder")

                .populate("grn")

                .skip(skip)

                .limit(limit)

                .sort({

                    createdAt: -1

                }),

            PurchaseInvoice.countDocuments(filter)

        ]);

        return {

            purchaseInvoices,

            total,

            page,

            limit,

            totalPages:
                Math.ceil(total / limit)

        };

    }

}

export default new PurchaseInvoiceRepository();
