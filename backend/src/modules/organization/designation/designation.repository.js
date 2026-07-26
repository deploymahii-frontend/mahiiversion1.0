import Designation from "./designation.model.js";

class DesignationRepository {

    async create(data) {
        return Designation.create([data]).then(result => result[0]);
    }

    async update(id, data) {
        return Designation.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async findById(id) {
        return Designation.findById(id)
            .populate("company")
            .populate("department");
    }

    async findByDepartment(departmentId) {
        return Designation.find({ department: departmentId })
            .populate("company")
            .populate("department");
    }

    async findByCompany(companyId) {
        return Designation.find({ company: companyId })
            .populate("company")
            .populate("department");
    }

    async findByCode(code) {
        return Designation.findOne({ code });
    }

    async search(search) {
        const regex = new RegExp(search, "i");
        return Designation.find({
            $or: [
                { name: regex },
                { code: regex },
                { description: regex }
            ]
        })
        .populate("company")
        .populate("department");
    }

    async paginate(filter = {}, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [designations, total] = await Promise.all([
            Designation.find(filter)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate("company")
                .populate("department"),
            Designation.countDocuments(filter)
        ]);

        return {
            designations,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }

    async statistics() {
        const [total, active, inactive] = await Promise.all([
            Designation.countDocuments(),
            Designation.countDocuments({ status: "ACTIVE" }),
            Designation.countDocuments({ status: "INACTIVE" })
        ]);

        return {
            total,
            active,
            inactive
        };
    }

}

export default new DesignationRepository();
