export function toSupplierPaymentResponse(payment) {

    if (!payment) {
        return null;
    }

    return {

        id: payment._id,

        paymentNumber: payment.paymentNumber,

        supplier: payment.supplier,

        paymentDate: payment.paymentDate,

        paymentMethod: payment.paymentMethod,

        referenceNumber: payment.referenceNumber,

        bankAccount: payment.bankAccount,

        totalAmount: payment.totalAmount,

        allocations: payment.allocations,

        remarks: payment.remarks,

        status: payment.status,

        createdBy: payment.createdBy,

        createdAt: payment.createdAt,

        updatedAt: payment.updatedAt

    };

}
