export function toBranchResponse(branch) {
    return {
        id: branch._id,
        company: branch.company,
        name: branch.name,
        code: branch.code,
        email: branch.email,
        phone: branch.phone,
        manager: branch.manager,
        address: branch.address,
        location: branch.location,
        status: branch.status,
        createdAt: branch.createdAt,
        updatedAt: branch.updatedAt
    };
}
