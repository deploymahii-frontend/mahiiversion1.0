import customerRepository from "./customer.repository.js";

export async function createCustomer(data) {

    const exists =
        await customerRepository.findByCode(
            data.customerCode
        );

    if (exists) {
        throw new Error("Customer code already exists.");
    }

    return customerRepository.create(data);
}

export async function updateCustomer(id, data) {

    return customerRepository.update(id, data);

}

export async function deleteCustomer(id) {

    return customerRepository.delete(id);

}

export async function getCustomer(id) {

    return customerRepository.findById(id);

}

export async function getCustomers(page, limit) {

    return customerRepository.paginate(
        {},
        page,
        limit
    );

}
