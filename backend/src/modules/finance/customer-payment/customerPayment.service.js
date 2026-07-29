import customerPaymentRepository from "./customerPayment.repository.js";
import salesInvoiceRepository from "../../sales/sales-invoice/salesInvoice.repository.js";

/*
|--------------------------------------------------------------------------
| Create Customer Payment
|--------------------------------------------------------------------------
*/

export async function createCustomerPayment(data) {

    const exists =
        await customerPaymentRepository.findByNumber(
            data.paymentNumber
        );

    if (exists) {

        throw new Error(
            "Payment number already exists."
        );

    }

    let allocatedTotal = 0;

    for (const allocation of data.allocations || []) {

        const invoice =
            await salesInvoiceRepository.findById(
                allocation.invoice
            );

        if (!invoice) {

            throw new Error(
                `Invoice not found: ${allocation.invoice}`
            );

        }

        allocatedTotal +=
            allocation.allocatedAmount;

    }

    if (allocatedTotal > data.amount) {

        throw new Error(
            "Allocated amount exceeds payment amount."
        );

    }

    return customerPaymentRepository.create(
        data
    );

}

/*
|--------------------------------------------------------------------------
| Update Payment
|--------------------------------------------------------------------------
*/

export async function updateCustomerPayment(
    id,
    data
) {

    return customerPaymentRepository.update(
        id,
        data
    );

}

/*
|--------------------------------------------------------------------------
| Delete Payment
|--------------------------------------------------------------------------
*/

export async function deleteCustomerPayment(
    id
) {

    return customerPaymentRepository.delete(
        id
    );

}

/*
|--------------------------------------------------------------------------
| Payment Details
|--------------------------------------------------------------------------
*/

export async function getCustomerPayment(
    id
) {

    return customerPaymentRepository.findById(
        id
    );

}

/*
|--------------------------------------------------------------------------
| Payment List
|--------------------------------------------------------------------------
*/

export async function getCustomerPayments(
    page,
    limit
) {

    return customerPaymentRepository.paginate(
        {},
        page,
        limit
    );

}
