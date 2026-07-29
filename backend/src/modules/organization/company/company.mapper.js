export function toCompanyResponse(company) {
    return {
        id: company._id,
        name: company.name,
        code: company.code,
        email: company.email,
        phone: company.phone,
        website: company.website,
        gstNumber: company.gstNumber,
        panNumber: company.panNumber,
        cinNumber: company.cinNumber,
        address: company.address,
        logo: company.logo,
        status: company.status,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt
    };
}
