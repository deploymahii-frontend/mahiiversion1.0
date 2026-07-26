import User from "./user.model.js";

class UserRepository {

    async create(data, options = {}) {
        return User.create([data], options).then(result => result[0]);
    }

    async findById(id) {
        return User.findById(id)
            .populate("role")
            .populate("company")
            .populate("branch")
            .populate("department")
            .populate("designation");
    }

    async findByEmail(email) {
        return User.findOne({
            email,
            status: { $ne: "DELETED" }
        });
    }

    async findByMobile(mobile) {
        return User.findOne({
            mobile,
            status: { $ne: "DELETED" }
        });
    }

    async findByEmployeeCode(employeeCode) {
        return User.findOne({
            employeeCode,
            status: { $ne: "DELETED" }
        });
    }

    async update(id, data) {
        return User.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async updateStatus(id, status) {
        return User.findByIdAndUpdate(
            id,
            { status },
            {
                new: true
            }
        );
    }

    async softDelete(id) {
        return User.findByIdAndUpdate(
            id,
            {
                status: "DELETED",
                deletedAt: new Date()
            },
            {
                new: true
            }
        );
    }

    async search(search) {

        const regex = new RegExp(search, "i");

        return User.find({

            status: {
                $ne: "DELETED"
            },

            $or: [

                {
                    firstName: regex
                },

                {
                    lastName: regex
                },

                {
                    email: regex
                },

                {
                    mobile: regex
                },

                {
                    employeeCode: regex
                }

            ]

        })

        .populate("role")

        .populate("department")

        .populate("designation")

        .lean();

    }

    async paginate(filter = {}, page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([

            User.find(filter)

                .skip(skip)

                .limit(limit)

                .sort({ createdAt: -1 })

                .populate("role")

                .populate("department")

                .populate("designation")

                .lean(),

            User.countDocuments(filter)

        ]);

        return {

            users,

            total,

            page,

            limit,

            totalPages: Math.ceil(total / limit)

        };

    }

    async bulkInsert(users) {
        return User.insertMany(users);
    }

    async exists(email) {
        return User.exists({
            email
        });
    }

    async getStatistics() {

        const [

            total,

            active,

            suspended,

            inactive

        ] = await Promise.all([

            User.countDocuments(),

            User.countDocuments({
                status: "ACTIVE"
            }),

            User.countDocuments({
                status: "SUSPENDED"
            }),

            User.countDocuments({
                status: "INACTIVE"
            })

        ]);

        return {

            total,

            active,

            suspended,

            inactive

        };

    }

}

export default new UserRepository();
