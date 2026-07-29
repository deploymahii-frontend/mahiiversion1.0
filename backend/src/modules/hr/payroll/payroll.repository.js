import Payroll from "./payroll.model.js";

class PayrollRepository {

    async create(data) {
        return Payroll.create(data);
    }

    async update(id, data) {
        return Payroll.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async findById(id) {
        return Payroll.findById(id)
            .populate("employee")
            .populate("salaryStructure");
    }

    async findEmployeePayroll(employee, month, year) {

        return Payroll.findOne({
            employee,
            month,
            year
        });

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [payrolls, total] = await Promise.all([

            Payroll.find(filter)
                .populate("employee")
                .skip(skip)
                .limit(limit)
                .sort({
                    createdAt: -1
                }),

            Payroll.countDocuments(filter)

        ]);

        return {
            payrolls,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };

    }

}

export default new PayrollRepository();
