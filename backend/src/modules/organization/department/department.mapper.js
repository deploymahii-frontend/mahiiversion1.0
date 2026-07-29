export function toDepartmentResponse(department) {
    return {
        id: department._id,
        company: department.company,
        branch: department.branch,
        name: department.name,
        code: department.code,
        manager: department.manager,
        description: department.description,
        status: department.status,
        createdAt: department.createdAt,
        updatedAt: department.updatedAt
    };
}
