import Branch from "./branch.model.js";

class BranchRepository {

    async create(data) {
        return Branch.create([data]).then(result => result[0]);
    }

    async findById(id) {
        return Branch.findById(id)
            .populate("company")
            .populate("manager");
    }

    async findByCompany(companyId) {
        return Branch.find({ company: companyId })
            .populate("company")
            .populate("manager");
    }

    async findByCode(code) {
        return Branch.findOne({ code });
    }

    async update(id, data) {
        return Branch.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async delete(id) {
        return Branch.findByIdAndDelete(id);
    }

    async search(search) {
        const regex = new RegExp(search, "i");

        return Branch.find({
            $or: [
                { name: regex },
                { code: regex },
                { email: regex },
                { phone: regex }
            ]
        })
        .populate("company")
        .populate("manager");
    }

    async paginate(filter = {}, page = 1, limit = 20) {
        const skip = (page - 1) * limit;

        const [branches, total] = await Promise.all([
            Branch.find(filter)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate("company")
                .populate("manager"),
            Branch.countDocuments(filter)
        ]);

        return {
            branches,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }

}

export default new BranchRepository();
