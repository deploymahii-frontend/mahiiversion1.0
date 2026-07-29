export function toUserResponse(user) {

    return {

        id: user._id,

        employeeCode: user.employeeCode,

        firstName: user.firstName,

        lastName: user.lastName,

        email: user.email,

        mobile: user.mobile,

        role: user.role,

        company: user.company,

        branch: user.branch,

        department: user.department,

        designation: user.designation,

        avatar: user.avatar,

        status: user.status,

        joiningDate: user.joiningDate

    };

}
