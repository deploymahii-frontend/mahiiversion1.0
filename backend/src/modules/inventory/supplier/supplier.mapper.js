export function toSupplierResponse(supplier) {

    if (!supplier) {
        return null;
    }

    return {

        id: supplier._id,

        supplierCode: supplier.supplierCode,

        companyName: supplier.companyName,

        contactPerson: supplier.contactPerson,

        email: supplier.email,

        phone: supplier.phone,

        gstNumber: supplier.gstNumber,

        panNumber: supplier.panNumber,

        address: supplier.address,

        paymentTerms: supplier.paymentTerms,

        creditLimit: supplier.creditLimit,

        notes: supplier.notes,

        isActive: supplier.isActive,

        createdAt: supplier.createdAt,

        updatedAt: supplier.updatedAt

    };

}
