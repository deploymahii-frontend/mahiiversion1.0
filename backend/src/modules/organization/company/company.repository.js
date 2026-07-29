import Company from "./company.model.js";

class CompanyRepository {

    async create(data) {
        return Company.create([data]).then(result => result[0]);
    }

    async findById(id) {
        return Company.findById(id);
    }

    async findByCode(code) {
        return Company.findOne({ code });
    }

    async findByName(name) {
        return Company.findOne({ name });
    }

    async findAll() {
        return Company.find({});
    }

    async update(id, data) {
        return Company.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async delete(id) {
        return Company.findByIdAndDelete(id);
    }

    async search(search) {
        const regex = new RegExp(search, "i");

        return Company.find({
            $or: [
                { name: regex },
                { code: regex },
                { email: regex },
                { phone: regex },
                { website: regex }
            ]
        });
    }

    async paginate(filter = {}, page = 1, limit = 20) {
        const skip = (page - 1) * limit;

        const [companies, total] = await Promise.all([
            Company.find(filter)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            Company.countDocuments(filter)
        ]);

        return {
            companies,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }

    async statistics() {
        const [total, active, inactive] = await Promise.all([
            Company.countDocuments(),
            Company.countDocuments({ status: "ACTIVE" }),
            Company.countDocuments({ status: "INACTIVE" })
        ]);

        return {
            total,
            active,
            inactive
        };
    }

}

export default new CompanyRepository();
