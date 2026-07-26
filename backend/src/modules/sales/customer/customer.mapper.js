export function toCustomerResponse(customer) {

    if (!customer) {
        return null;
    }

    return {

        id: customer._id,

        customerCode: customer.customerCode,

        name: customer.name,

        companyName: customer.companyName,

        email: customer.email,

        phone: customer.phone,

        gstNumber: customer.gstNumber,

        panNumber: customer.panNumber,

        creditLimit: customer.creditLimit,

        outstandingAmount: customer.outstandingAmount,

        billingAddress: customer.billingAddress,

        shippingAddress: customer.shippingAddress,

        status: customer.status,

        createdAt: customer.createdAt,

        updatedAt: customer.updatedAt

    };

}
