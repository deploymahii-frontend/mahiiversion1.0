import SalaryStructure from "./salary-structure.model.js";

class SalaryStructureRepository {
    async create(data) {
        return SalaryStructure.create(data);
    }

    async update(id, data) {
        return SalaryStructure.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async findByEmployee(employeeId) {
        return SalaryStructure.findOne({ employee: employeeId })
            .populate("employee");
    }

    async findById(id) {
        return SalaryStructure.findById(id).populate("employee");
    }

    async calculateGrossSalary(data) {
        return (
            Number(data.basicSalary || 0) +
            Number(data.hra || 0) +
            Number(data.da || 0) +
            Number(data.specialAllowance || 0) +
            Number(data.medicalAllowance || 0) +
            Number(data.travelAllowance || 0) +
            Number(data.otherAllowance || 0)
        );
    }

    async calculateNetSalary(data) {
        const grossSalary = await this.calculateGrossSalary(data);

        return (
            grossSalary -
            Number(data.pf || 0) -
            Number(data.esi || 0) -
            Number(data.professionalTax || 0) -
            Number(data.incomeTax || 0) -
            Number(data.otherDeduction || 0)
        );
    }

    async findHistory(employeeId) {
        return SalaryStructure.find({ employee: employeeId })
            .populate("employee")
            .sort({ effectiveFrom: -1 });
    }

    async paginate(filter = {}, page = 1, limit = 20) {
        const skip = (page - 1) * limit;

        const [structures, total] = await Promise.all([
            SalaryStructure.find(filter)
                .populate("employee")
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            SalaryStructure.countDocuments(filter)
        ]);

        return {
            structures,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }
}

export default new SalaryStructureRepository();
