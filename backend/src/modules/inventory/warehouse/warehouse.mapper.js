export function toWarehouseResponse(warehouse) {

    if (!warehouse) {

        return null;

    }

    return {

        id: warehouse._id,

        code: warehouse.code,

        name: warehouse.name,

        description: warehouse.description,

        address: warehouse.address,

        manager: warehouse.manager,

        contactNumber: warehouse.contactNumber,

        email: warehouse.email,

        isActive: warehouse.isActive,

        createdAt: warehouse.createdAt,

        updatedAt: warehouse.updatedAt

    };

}
