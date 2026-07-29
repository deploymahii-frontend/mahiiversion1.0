export function toCustomerPaymentResponse(payment) {

    if (!payment) {
        return null;
    }

    return {

        id: payment._id,

        paymentNumber: payment.paymentNumber,

        customer: payment.customer,

        paymentDate: payment.paymentDate,

        paymentMethod: payment.paymentMethod,

        referenceNumber: payment.referenceNumber,

        amount: payment.amount,

        allocations: payment.allocations,

        notes: payment.notes,

        status: payment.status,

        createdAt: payment.createdAt,

        updatedAt: payment.updatedAt

    };

}
