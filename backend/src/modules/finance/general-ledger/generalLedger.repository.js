import GeneralLedger from "./generalLedger.model.js";

class GeneralLedgerRepository {

    async create(data) {

        return GeneralLedger.create(data);

    }

    async createMany(data) {

        return GeneralLedger.insertMany(data);

    }

    async findById(id) {

        return GeneralLedger.findById(id)

            .populate("account")

            .populate("journal");

    }

    async findByAccount(account) {

        return GeneralLedger.find({

            account

        })

        .sort({

            transactionDate: 1,

            createdAt: 1

        });

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [rows, total] = await Promise.all([

            GeneralLedger.find(filter)

                .populate("account")

                .populate("journal")

                .sort({

                    transactionDate: -1

                })

                .skip(skip)

                .limit(limit),

            GeneralLedger.countDocuments(filter)

        ]);

        return {

            rows,

            total,

            page,

            limit,

            totalPages:
                Math.ceil(total / limit)

        };

    }

}

export default new GeneralLedgerRepository();
