export function toEmployeeResponse(employee) {

    if (!employee) {
        return null;
    }

    return {

        id: employee._id,

        employeeCode: employee.employeeCode,

        status: employee.status,

        joiningDate: employee.joiningDate,

        confirmationDate: employee.confirmationDate,

        probationEndDate: employee.probationEndDate,

        resignationDate: employee.resignationDate,

        relievingDate: employee.relievingDate,

        employmentType: employee.employmentType,

        workEmail: employee.workEmail,

        workPhone: employee.workPhone,

        extension: employee.extension,

        attendanceEnabled: employee.attendanceEnabled,

        payrollEnabled: employee.payrollEnabled,

        leaveEnabled: employee.leaveEnabled,

        biometricId: employee.biometricId,

        faceRecognitionId: employee.faceRecognitionId,

        company: employee.company
            ? {
                id: employee.company._id,
                name: employee.company.name,
                code: employee.company.code
            }
            : null,

        branch: employee.branch
            ? {
                id: employee.branch._id,
                name: employee.branch.name,
                code: employee.branch.code
            }
            : null,

        department: employee.department
            ? {
                id: employee.department._id,
                name: employee.department.name,
                code: employee.department.code
            }
            : null,

        designation: employee.designation
            ? {
                id: employee.designation._id,
                name: employee.designation.name,
                code: employee.designation.code
            }
            : null,

        reportingManager: employee.reportingManager
            ? {
                id: employee.reportingManager._id,
                employeeCode:
                    employee.reportingManager.employeeCode
            }
            : null,

        user: employee.user
            ? {
                id: employee.user._id,
                firstName: employee.user.firstName,
                lastName: employee.user.lastName,
                email: employee.user.email,
                mobile: employee.user.mobile
            }
            : null,

        createdAt: employee.createdAt,

        updatedAt: employee.updatedAt

    };

}
