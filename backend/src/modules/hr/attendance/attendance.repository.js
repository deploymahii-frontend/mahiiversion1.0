import Attendance from "./attendance.model.js";

class AttendanceRepository {

    async create(data) {
        return Attendance.create(data);
    }

    async findById(id) {
        return Attendance.findById(id)
            .populate("employee")
            .populate("shift");
    }

    async findByEmployee(employeeId) {
        return Attendance.find({
            employee: employeeId
        }).sort({
            date: -1
        });
    }

    async findByDate(date) {
        return Attendance.find({
            date
        }).populate("employee");
    }

    async findBetweenDates(employeeId, from, to) {

        return Attendance.find({

            employee: employeeId,

            date: {

                $gte: from,

                $lte: to

            }

        }).sort({
            date: 1
        });

    }

    async checkIn(employeeId, date, checkIn) {

        return Attendance.findOneAndUpdate(

            {
                employee: employeeId,
                date
            },

            {
                employee: employeeId,
                date,
                checkIn
            },

            {
                upsert: true,
                new: true
            }

        );

    }

    async checkOut(id, checkOut, workingHours) {

        return Attendance.findByIdAndUpdate(

            id,

            {

                checkOut,

                workingHours

            },

            {

                new: true

            }

        );

    }

    async update(id, data) {

        return Attendance.findByIdAndUpdate(

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

        const [attendance, total] = await Promise.all([

            Attendance.find(filter)

                .skip(skip)

                .limit(limit)

                .populate("employee")

                .sort({

                    date: -1

                }),

            Attendance.countDocuments(filter)

        ]);

        return {

            attendance,

            total,

            page,

            limit,

            totalPages: Math.ceil(total / limit)

        };

    }

    async statistics() {

        const [

            total,

            present,

            absent,

            late,

            leave

        ] = await Promise.all([

            Attendance.countDocuments(),

            Attendance.countDocuments({
                status: "PRESENT"
            }),

            Attendance.countDocuments({
                status: "ABSENT"
            }),

            Attendance.countDocuments({
                status: "LATE"
            }),

            Attendance.countDocuments({
                status: "LEAVE"
            })

        ]);

        return {

            total,

            present,

            absent,

            late,

            leave

        };

    }

}

export default new AttendanceRepository();