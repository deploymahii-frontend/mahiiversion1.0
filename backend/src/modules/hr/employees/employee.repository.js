import Employee from "./employee.model.js";

class EmployeeRepository {

    async create(data, options = {}) {
        return Employee.create([data], options).then(
            result => result[0]
        );
    }

    async findById(id) {
        return Employee.findById(id)
            .populate("user")
            .populate("company")
            .populate("branch")
            .populate("department")
            .populate("designation")
            .populate("reportingManager");
    }

    async findByUserId(userId) {
        return Employee.findOne({
            user: userId
        });
    }

    async findByEmployeeCode(employeeCode) {
        return Employee.findOne({
            employeeCode
        });
    }

    async findByCompany(companyId) {
        return Employee.find({
            company: companyId
        });
    }

    async findByBranch(branchId) {
        return Employee.find({
            branch: branchId
        });
    }

    async findByDepartment(departmentId) {
        return Employee.find({
            department: departmentId
        });
    }

    async findByManager(managerId) {
        return Employee.find({
            reportingManager: managerId
        });
    }

    async update(id, data) {
        return Employee.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async activate(id) {
        return Employee.findByIdAndUpdate(
            id,
            {
                status: "ACTIVE"
            },
            {
                new: true
            }
        );
    }

    async terminate(id) {
        return Employee.findByIdAndUpdate(
            id,
            {
                status: "TERMINATED"
            },
            {
                new: true
            }
        );
    }

    async resign(id, relievingDate) {
        return Employee.findByIdAndUpdate(
            id,
            {
                status: "RESIGNED",
                relievingDate
            },
            {
                new: true
            }
        );
    }

    async softDelete(id) {
        return Employee.findByIdAndUpdate(
            id,
            {
                deletedAt: new Date(),
                status: "INACTIVE"
            },
            {
                new: true
            }
        );
    }

    async search(search) {

        const regex = new RegExp(search, "i");

        return Employee.find({

            $or: [

                {
                    employeeCode: regex
                },

                {
                    workEmail: regex
                }

            ]

        })

        .populate("user")

        .populate("department")

        .populate("designation")

        .lean();

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [employees, total] = await Promise.all([

            Employee.find(filter)

                .skip(skip)

                .limit(limit)

                .sort({
                    createdAt: -1
                })

                .populate("user")

                .populate("department")

                .populate("designation")

                .lean(),

            Employee.countDocuments(filter)

        ]);

        return {

            employees,

            total,

            page,

            limit,

            totalPages: Math.ceil(total / limit)

        };

    }

    async exists(employeeCode) {
        return Employee.exists({
            employeeCode
        });
    }

    async statistics() {

        const [

            total,

            active,

            probation,

            resigned,

            terminated

        ] = await Promise.all([

            Employee.countDocuments(),

            Employee.countDocuments({
                status: "ACTIVE"
            }),

            Employee.countDocuments({
                status: "PROBATION"
            }),

            Employee.countDocuments({
                status: "RESIGNED"
            }),

            Employee.countDocuments({
                status: "TERMINATED"
            })

        ]);

        return {

            total,

            active,

            probation,

            resigned,

            terminated

        };

    }

}

export default new EmployeeRepository();
