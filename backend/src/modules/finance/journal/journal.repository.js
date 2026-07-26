import Journal from "./journal.model.js";

class JournalRepository {

    async create(data) {

        return Journal.create(data);

    }

    async update(id, data) {

        return Journal.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async delete(id) {

        return Journal.findByIdAndDelete(id);

    }

    async findById(id) {

        return Journal.findById(id)

            .populate("lines.account")

            .populate("postedBy");

    }

    async findByJournalNumber(journalNumber) {

        return Journal.findOne({

            journalNumber

        });

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [journals, total] = await Promise.all([

            Journal.find(filter)

                .populate("postedBy")

                .skip(skip)

                .limit(limit)

                .sort({

                    journalDate: -1

                }),

            Journal.countDocuments(filter)

        ]);

        return {

            journals,

            total,

            page,

            limit,

            totalPages:
                Math.ceil(total / limit)

        };

    }

}

export default new JournalRepository();
