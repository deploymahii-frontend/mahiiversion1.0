import Department from "./department.model.js";

class DepartmentRepository {

    async create(data) {
        return Department.create([data]).then(result => result[0]);
    }

    async update(id, data) {
        return Department.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async findById(id) {
        return Department.findById(id)
            .populate("company")
            .populate("branch")
            .populate("manager");
    }

    async findByCompany(companyId) {
        return Department.find({ company: companyId })
            .populate("company")
            .populate("branch")
            .populate("manager");
    }

    async findByBranch(branchId) {
        return Department.find({ branch: branchId })
            .populate("company")
            .populate("branch")
            .populate("manager");
    }

    async findByCode(code) {
        return Department.findOne({ code });
    }

    async search(search) {
        const regex = new RegExp(search, "i");
        return Department.find({
            $or: [
                { name: regex },
                { code: regex },
                { description: regex }
            ]
        })
        .populate("company")
        .populate("branch")
        .populate("manager");
    }

    async paginate(filter = {}, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [departments, total] = await Promise.all([
            Department.find(filter)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate("company")
                .populate("branch")
                .populate("manager"),
            Department.countDocuments(filter)
        ]);

        return {
            departments,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }

    async statistics() {
        const [total, active, inactive] = await Promise.all([
            Department.countDocuments(),
            Department.countDocuments({ status: "ACTIVE" }),
            Department.countDocuments({ status: "INACTIVE" })
        ]);

        return {
            total,
            active,
            inactive
        };
    }

}

export default new DepartmentRepository();
