import companyRepository from "./company.repository.js";
import { toCompanyResponse } from "./company.mapper.js";

export async function createCompany(data) {
    const existingName = await companyRepository.findByName(data.name);
    if (existingName) {
        throw new Error("Company name already exists.");
    }

    const existingCode = await companyRepository.findByCode(data.code);
    if (existingCode) {
        throw new Error("Company code already exists.");
    }

    const company = await companyRepository.create(data);
    return toCompanyResponse(company);
}

export async function updateCompany(id, data) {
    const company = await companyRepository.findById(id);
    if (!company) {
        throw new Error("Company not found.");
    }

    if (data.name && data.name !== company.name) {
        const existingName = await companyRepository.findByName(data.name);
        if (existingName) {
            throw new Error("Company name already exists.");
        }
    }

    if (data.code && data.code !== company.code) {
        const existingCode = await companyRepository.findByCode(data.code);
        if (existingCode) {
            throw new Error("Company code already exists.");
        }
    }

    const updated = await companyRepository.update(id, data);
    return toCompanyResponse(updated);
}

export async function deactivateCompany(id) {
    const company = await companyRepository.update(id, { status: "INACTIVE" });
    if (!company) {
        throw new Error("Company not found.");
    }
    return toCompanyResponse(company);
}

export async function activateCompany(id) {
    const company = await companyRepository.update(id, { status: "ACTIVE" });
    if (!company) {
        throw new Error("Company not found.");
    }
    return toCompanyResponse(company);
}

export async function getCompany(id) {
    const company = await companyRepository.findById(id);
    if (!company) {
        throw new Error("Company not found.");
    }
    return toCompanyResponse(company);
}

export async function getCompanies(page, limit) {
    return companyRepository.paginate({}, page, limit);
}

export async function searchCompanies(query) {
    return companyRepository.search(query);
}

export async function deleteCompany(id) {
    const deleted = await companyRepository.delete(id);
    if (!deleted) {
        throw new Error("Company not found.");
    }
    return { success: true };
}

export async function getCompanyStatistics() {
    return companyRepository.statistics();
}
