import Leave from "./leave.model.js";

class LeaveRepository {

    async create(data) {
        return Leave.create(data);
    }

    async findById(id) {
        return Leave.findById(id)
            .populate("employee")
            .populate("approvedBy");
    }

    async findByEmployee(employeeId) {
        return Leave.find({
            employee: employeeId
        }).sort({
            fromDate: -1
        });
    }

    async findPending() {
        return Leave.find({
            status: "PENDING"
        })
        .populate("employee")
        .sort({
            createdAt: -1
        });
    }

    async findApproved(employeeId) {
        return Leave.find({
            employee: employeeId,
            status: "APPROVED"
        });
    }

    async approve(id, approvedBy) {

        return Leave.findByIdAndUpdate(

            id,

            {
                status: "APPROVED",
                approvedBy,
                approvedAt: new Date()
            },

            {
                new: true
            }

        );

    }

    async reject(id, approvedBy, rejectionReason) {

        return Leave.findByIdAndUpdate(

            id,

            {
                status: "REJECTED",
                approvedBy,
                approvedAt: new Date(),
                rejectionReason
            },

            {
                new: true
            }

        );

    }

    async cancel(id) {

        return Leave.findByIdAndUpdate(

            id,

            {
                status: "CANCELLED"
            },

            {
                new: true
            }

        );

    }

    async update(id, data) {

        return Leave.findByIdAndUpdate(

            id,

            data,

            {
                new: true,
                runValidators: true
            }

        );

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [leaves, total] = await Promise.all([

            Leave.find(filter)

                .populate("employee")

                .skip(skip)

                .limit(limit)

                .sort({
                    createdAt: -1
                }),

            Leave.countDocuments(filter)

        ]);

        return {

            leaves,

            total,

            page,

            limit,

            totalPages: Math.ceil(total / limit)

        };

    }

    async statistics() {

        const [

            total,

            pending,

            approved,

            rejected,

            cancelled

        ] = await Promise.all([

            Leave.countDocuments(),

            Leave.countDocuments({
                status: "PENDING"
            }),

            Leave.countDocuments({
                status: "APPROVED"
            }),

            Leave.countDocuments({
                status: "REJECTED"
            }),

            Leave.countDocuments({
                status: "CANCELLED"
            })

        ]);

        return {

            total,

            pending,

            approved,

            rejected,

            cancelled

        };

    }

}

export default new LeaveRepository();
