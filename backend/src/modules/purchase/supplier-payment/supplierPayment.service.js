import mongoose from "mongoose";

import supplierPaymentRepository from "./supplierPayment.repository.js";
import purchaseInvoiceRepository from "../purchase-invoice/purchaseInvoice.repository.js";

/*
|--------------------------------------------------------------------------
| Create Supplier Payment
|--------------------------------------------------------------------------
*/

export async function createSupplierPayment(data) {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const exists =
            await supplierPaymentRepository.findByPaymentNumber(
                data.paymentNumber
            );

        if (exists) {

            throw new Error(
                "Payment number already exists."
            );

        }

        let allocatedTotal = 0;

        for (const allocation of data.allocations) {

            const invoice =
                await purchaseInvoiceRepository.findById(
                    allocation.purchaseInvoice
                );

            if (!invoice) {

                throw new Error(
                    "Purchase Invoice not found."
                );

            }

            allocatedTotal += allocation.allocatedAmount;

            const alreadyPaid =
                invoice.paidAmount || 0;

            const newPaid =
                alreadyPaid + allocation.allocatedAmount;

            invoice.paidAmount = newPaid;

            if (newPaid >= invoice.grandTotal) {

                invoice.paymentStatus = "PAID";

                invoice.status = "PAID";

            } else {

                invoice.paymentStatus = "PARTIAL";

                invoice.status = "PARTIALLY_PAID";

            }

            await invoice.save({
                session
            });

        }

        if (allocatedTotal !== data.totalAmount) {

            throw new Error(
                "Allocated amount mismatch."
            );

        }

        const payment =
            await supplierPaymentRepository.create(
                data
            );

        await session.commitTransaction();

        session.endSession();

        return payment;

    } catch (error) {

        await session.abortTransaction();

        session.endSession();

        throw error;

    }

}

/*
|--------------------------------------------------------------------------
| Details
|--------------------------------------------------------------------------
*/

export async function getSupplierPayment(id) {

    return supplierPaymentRepository.findById(id);

}

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

export async function getSupplierPayments(page, limit) {

    return supplierPaymentRepository.paginate(
        {},
        page,
        limit
    );

}

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

export async function updateSupplierPayment(
    id,
    data
) {

    return supplierPaymentRepository.update(
        id,
        data
    );

}

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

export async function deleteSupplierPayment(
    id
) {

    return supplierPaymentRepository.delete(id);

}
