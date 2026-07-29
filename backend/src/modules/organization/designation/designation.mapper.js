export function toDesignationResponse(designation) {
    return {
        id: designation._id,
        company: designation.company,
        department: designation.department,
        name: designation.name,
        code: designation.code,
        level: designation.level,
        description: designation.description,
        status: designation.status,
        createdAt: designation.createdAt,
        updatedAt: designation.updatedAt
    };
}
